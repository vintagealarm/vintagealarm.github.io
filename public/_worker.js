const PREVIEW_USERNAME = 'preview';
const PREVIEW_PASSWORD_SHA256 = 'f745330a3a3214ad262ffdfd1f98dc8c6dfe1cd5e80596fca8baa7ae40407564';

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

async function authorized(request) {
  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) return false;

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(':');
    if (separator < 0) return false;

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    if (username !== PREVIEW_USERNAME) return false;

    const digest = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(password)
    );
    return constantTimeEqual(toHex(digest), PREVIEW_PASSWORD_SHA256);
  } catch {
    return false;
  }
}

function protectedHeaders(headers = new Headers()) {
  const next = new Headers(headers);
  next.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next.set('Referrer-Policy', 'no-referrer');
  return next;
}

export default {
  async fetch(request, env) {
    if (!(await authorized(request))) {
      return new Response('Authentication required.', {
        status: 401,
        headers: protectedHeaders(new Headers({
          'WWW-Authenticate': 'Basic realm="VINTAGE ALARM preview", charset="UTF-8"',
          'Cache-Control': 'no-store'
        }))
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = protectedHeaders(response.headers);
    if ((headers.get('Content-Type') || '').includes('text/html')) {
      headers.set('Cache-Control', 'no-store');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
