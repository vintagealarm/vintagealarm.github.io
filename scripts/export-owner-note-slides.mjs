#!/usr/bin/env node
import { createHash, createSign } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_MANIFEST = 'tools/owner-note-slides/manifest.json';
const DEFAULT_OUTPUT = 'artifacts/owner-note-slides';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/presentations.readonly';

export function readPngDimensions(buffer) {
  const bytes = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(signature)) {
    throw new Error('Exported file is not a valid PNG.');
  }
  if (bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('PNG has no IHDR header at the expected position.');
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20)
  };
}

export function validateManifest(manifest) {
  if (!manifest || manifest.version !== 1) throw new Error('Slide export manifest version must be 1.');
  if (!manifest.presentationId) throw new Error('Slide export manifest is missing presentationId.');
  if (!manifest.expected || manifest.expected.mimeType !== 'image/png') {
    throw new Error('Slide export manifest must require image/png.');
  }
  if (manifest.expected.thumbnailSize !== 'LARGE') {
    throw new Error('Slide export manifest must use Google Slides LARGE thumbnails.');
  }
  if (!Number.isInteger(manifest.expected.width) || !Number.isInteger(manifest.expected.height)) {
    throw new Error('Slide export manifest requires integer width/height.');
  }
  if (!Array.isArray(manifest.slides) || manifest.slides.length === 0) {
    throw new Error('Slide export manifest has no slides.');
  }
  for (const field of ['key', 'objectId', 'fileName']) {
    const values = manifest.slides.map((slide) => slide[field]);
    if (values.some((value) => !value)) throw new Error('Slide export manifest has an empty ' + field + '.');
    if (new Set(values).size !== values.length) throw new Error('Slide export manifest has duplicate ' + field + ' values.');
  }
  for (const slide of manifest.slides) {
    if (!['ja', 'en', 'de'].includes(slide.language)) {
      throw new Error('Unsupported slide language for ' + slide.key + ': ' + slide.language);
    }
    if (!slide.fileName.endsWith('.png')) {
      throw new Error('Slide export filename must end in .png: ' + slide.fileName);
    }
  }
  return true;
}

function parseArgs(argv) {
  const options = { manifest: DEFAULT_MANIFEST, output: DEFAULT_OUTPUT, selectors: [], list: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--manifest') {
      options.manifest = argv[++index];
    } else if (arg === '--output') {
      options.output = argv[++index];
    } else if (arg === '--slides' || arg === '--slide') {
      const value = argv[++index] || '';
      options.selectors.push(...value.split(',').map((part) => part.trim()).filter(Boolean));
    } else if (arg === '--list') {
      options.list = true;
    } else {
      throw new Error('Unknown argument: ' + arg);
    }
  }
  return options;
}

function base64UrlJson(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

async function getAccessToken(env = process.env) {
  const direct = String(env.GOOGLE_OAUTH_ACCESS_TOKEN || '').trim();
  if (direct) return direct;

  const raw = String(env.GOOGLE_SERVICE_ACCOUNT_JSON || '').trim();
  if (!raw) {
    throw new Error(
      'Google auth is missing. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_OAUTH_ACCESS_TOKEN. ' +
      'Do not commit credentials to the repository.'
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.');
  }

  const clientEmail = credentials.client_email;
  const privateKey = credentials.private_key;
  const tokenUri = credentials.token_uri || 'https://oauth2.googleapis.com/token';
  if (!clientEmail || !privateKey) {
    throw new Error('Service-account JSON must contain client_email and private_key.');
  }

  const now = Math.floor(Date.now() / 1000);
  const encodedHeader = base64UrlJson({ alg: 'RS256', typ: 'JWT' });
  const encodedPayload = base64UrlJson({
    iss: clientEmail,
    scope: GOOGLE_SCOPE,
    aud: tokenUri,
    iat: now,
    exp: now + 3600
  });
  const unsigned = encodedHeader + '.' + encodedPayload;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const assertion = unsigned + '.' + signer.sign(privateKey).toString('base64url');

  const response = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error('Google OAuth token request failed (' + response.status + '): ' + body.slice(0, 300));
  }
  const data = await response.json();
  if (!data.access_token) throw new Error('Google OAuth response did not include access_token.');
  return data.access_token;
}

async function googleJson(url, token) {
  const response = await fetch(url, { headers: { authorization: 'Bearer ' + token } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error('Google Slides API request failed (' + response.status + '): ' + body.slice(0, 500));
  }
  return response.json();
}

async function fetchPresentationMeta(presentationId, token) {
  const fields = encodeURIComponent('presentationId,title,revisionId');
  const url = 'https://slides.googleapis.com/v1/presentations/' +
    encodeURIComponent(presentationId) + '?fields=' + fields;
  return googleJson(url, token);
}

async function fetchThumbnail(presentationId, objectId, token) {
  const params = new URLSearchParams({
    'thumbnailProperties.mimeType': 'PNG',
    'thumbnailProperties.thumbnailSize': 'LARGE'
  });
  const url = 'https://slides.googleapis.com/v1/presentations/' +
    encodeURIComponent(presentationId) + '/pages/' + encodeURIComponent(objectId) +
    '/thumbnail?' + params.toString();
  return googleJson(url, token);
}

async function downloadPng(contentUrl) {
  const response = await fetch(contentUrl);
  if (!response.ok) throw new Error('Thumbnail download failed (' + response.status + ').');
  return Buffer.from(await response.arrayBuffer());
}

function selectSlides(manifest, selectors) {
  if (!selectors.length || selectors.includes('all')) return manifest.slides;
  const selected = [];
  const seen = new Set();
  for (const selector of selectors) {
    const match = manifest.slides.find((slide) => slide.key === selector || slide.objectId === selector);
    if (!match) throw new Error('Unknown slide selector: ' + selector);
    if (!seen.has(match.key)) {
      selected.push(match);
      seen.add(match.key);
    }
  }
  return selected;
}

export async function runExport(options) {
  const manifestPath = resolve(options.manifest || DEFAULT_MANIFEST);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  validateManifest(manifest);

  if (options.list) {
    for (const slide of manifest.slides) {
      console.log([slide.key, slide.objectId, slide.fileName].join('\t'));
    }
    return { listed: manifest.slides.length };
  }

  const slides = selectSlides(manifest, options.selectors || []);
  const token = await getAccessToken();
  const meta = await fetchPresentationMeta(manifest.presentationId, token);

  if (manifest.presentationTitle && meta.title !== manifest.presentationTitle) {
    throw new Error(
      'Presentation title mismatch. Expected "' + manifest.presentationTitle +
      '", received "' + String(meta.title || '') + '".'
    );
  }

  const outputDir = resolve(options.output || DEFAULT_OUTPUT);
  await mkdir(outputDir, { recursive: true });

  const exported = [];
  for (const slide of slides) {
    const thumbnail = await fetchThumbnail(manifest.presentationId, slide.objectId, token);
    if (!thumbnail.contentUrl) throw new Error('Google Slides returned no contentUrl for ' + slide.key + '.');

    if (
      Number.isInteger(thumbnail.width) &&
      Number.isInteger(thumbnail.height) &&
      (thumbnail.width !== manifest.expected.width || thumbnail.height !== manifest.expected.height)
    ) {
      throw new Error(
        'Google Slides metadata dimension mismatch for ' + slide.key + ': ' +
        thumbnail.width + 'x' + thumbnail.height + ', expected ' +
        manifest.expected.width + 'x' + manifest.expected.height + '.'
      );
    }

    const png = await downloadPng(thumbnail.contentUrl);
    const dimensions = readPngDimensions(png);
    if (dimensions.width !== manifest.expected.width || dimensions.height !== manifest.expected.height) {
      throw new Error(
        'PNG dimension mismatch for ' + slide.key + ': ' +
        dimensions.width + 'x' + dimensions.height + ', expected ' +
        manifest.expected.width + 'x' + manifest.expected.height + '.'
      );
    }

    const outputPath = resolve(outputDir, slide.fileName);
    await writeFile(outputPath, png);
    const sha256 = createHash('sha256').update(png).digest('hex');
    exported.push({
      key: slide.key,
      watch: slide.watch,
      language: slide.language,
      objectId: slide.objectId,
      fileName: slide.fileName,
      width: dimensions.width,
      height: dimensions.height,
      sha256,
      bytes: png.length
    });
    console.log('exported ' + slide.key + ' -> ' + outputPath + ' (' + dimensions.width + 'x' + dimensions.height + ')');
  }

  const exportManifest = {
    version: 1,
    presentationId: manifest.presentationId,
    presentationTitle: meta.title || null,
    presentationRevisionId: meta.revisionId || null,
    exportedAt: new Date().toISOString(),
    expected: manifest.expected,
    slides: exported
  };
  await writeFile(resolve(outputDir, 'export-manifest.json'), JSON.stringify(exportManifest, null, 2) + '\n', 'utf8');
  console.log('export complete: ' + exported.length + ' slide(s)');
  return exportManifest;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  await runExport(options);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : '';
if (invokedPath && import.meta.url === invokedPath) {
  main().catch((error) => {
    console.error('OWNER\'S NOTE slide export failed: ' + error.message);
    process.exitCode = 1;
  });
}
