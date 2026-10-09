// OWNER'S NOTE language-specific image overrides. JA's canonical path stays in each WATCH frontmatter.
type NoteImageLocale = 'en' | 'de';
const overrides: Record<string, Partial<Record<NoteImageLocale, string>>> = {
  'pierce-duofon': {
    en: '/images/pierce-duofon/owners-note-en.png',
    de: '/images/pierce-duofon/owners-note-de.png'
  }
};
export function getLocalizedOwnerNoteImage(slug: string, language: NoteImageLocale, fallback: string): string {
  return overrides[slug]?.[language] ?? fallback;
}
