import { execFileSync } from 'node:child_process';

export function getGitLastmod(filePath: string) {
  try {
    const value = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      encoding: 'utf8'
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

export function latestDate(...values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1);
}
