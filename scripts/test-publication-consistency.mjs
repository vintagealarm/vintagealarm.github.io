import assert from 'node:assert/strict';
import { extractLlmsWatchSlugs, publicationSetErrors } from './publication-consistency.mjs';

const render = (slugs) => `Published watch pages:\n${slugs.map((slug) => `- https://vintagealarm.github.io/${slug}/`).join('\n')}\n\nEnglish entry:\n${slugs.map((slug) => `- https://vintagealarm.github.io/en/${slug}/`).join('\n')}\n\nGerman entry:\n${slugs.map((slug) => `- https://vintagealarm.github.io/de/${slug}/`).join('\n')}\n\nMachine-readable index:`;
const states = [
  { slug: 'basis-alarm', published: true },
  { slug: 'arsa-blind-alarm', published: true }
];
const all = states.map((watch) => watch.slug);

assert.deepEqual(publicationSetErrors(states, extractLlmsWatchSlugs(render(all), all)), [], 'two published watches align');

const arsaPrivate = states.map((watch) => watch.slug === 'arsa-blind-alarm' ? { ...watch, published: false } : watch);
assert.deepEqual(publicationSetErrors(arsaPrivate, extractLlmsWatchSlugs(render(['basis-alarm']), all)), [], 'published true→false dynamically reduces every language');

const stale = publicationSetErrors(arsaPrivate, extractLlmsWatchSlugs(render(all), all));
assert.equal(stale.length, 3, 'stale ARSA route fails JA / EN / DE');

const republished = states.map((watch) => ({ ...watch }));
assert.deepEqual(publicationSetErrors(republished, extractLlmsWatchSlugs(render(all), all)), [], 'published false→true dynamically expands every language');

const duplicateRoute = render(all).replace('- https://vintagealarm.github.io/arsa-blind-alarm/', '- https://vintagealarm.github.io/arsa-blind-alarm/\n- https://vintagealarm.github.io/arsa-blind-alarm/');
assert.equal(publicationSetErrors(states, extractLlmsWatchSlugs(duplicateRoute, all)).length, 1, 'duplicate direct WATCH route fails its language section');

console.log('Publication consistency tests passed: 5 cases.');
