// Self-contained so the same function can run in the generated dashboard.
export function buildDiscoveryShare(storage, compact = false) {
  const result = {
    schemaVersion: 'vintage-alarm-discovery-share-v1',
    source: 'browser-local-import',
    verification: 'user-imported; not verified by the analytics server',
    automaticRetrieval: false,
    periodPolicy: 'Import periods are independent of the selected analytics window.',
    geoPolicy: 'Imported GEO metrics are not proof of AI citations or answer accuracy.',
  };
  let snapshots;
  try {
    snapshots = JSON.parse(storage.getItem('vaDiscoverySnapshotsV1') || '[]');
    if (!Array.isArray(snapshots)) throw new Error('Invalid snapshot list');
    for (const item of snapshots) {
      if (!item || !['seo', 'geo'].includes(item.kind) || !Array.isArray(item.files) ||
          !Number.isFinite(Date.parse(item.importedAt)) ||
          item.files.some(file => !file || !Array.isArray(file.rows) || !Array.isArray(file.headers) ||
            file.rows.some(row => !row || typeof row !== 'object'))) {
        throw new Error('Invalid snapshot');
      }
    }
  } catch {
    result.seo = result.geo = { status: 'UNREADABLE', latest: null };
  }
  if (snapshots && Array.isArray(snapshots) && !result.seo) {
    for (const kind of ['seo', 'geo']) {
      const items = snapshots.filter(item => item.kind === kind)
        .sort((a, b) => b.importedAt.localeCompare(a.importedAt));
      const records = items.map(item => {
        const dates = item.files.filter(file => file.dimension === 'date')
          .flatMap(file => file.rows.map(row => row.key))
          .filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort();
        // Preserve the imported summary without treating importer-filled zeros
        // as evidence that an absent CSV column measured zero.
        const source = item.files.find(file => file.dimension === 'date') || item.files.find(file => file.rows.length);
        const headers = source?.headers.join(' ') || '';
        const patterns = { clicks: /click|クリック/i, impressions: /impression|表示回数/i,
          ctr: /ctr|クリック率/i, position: /position|掲載順位/i };
        const summary = {};
        for (const [metric, pattern] of Object.entries(patterns)) {
          const value = item.summary?.[metric];
          summary[metric] = (kind === 'seo' || metric === 'impressions') && pattern.test(headers) && typeof value === 'number' && Number.isFinite(value) ? value : null;
        }
        return {
          importedAt: item.importedAt,
          dataPeriod: dates.length ? { start: dates[0], end: dates.at(-1), basis: 'observed CSV date rows' } : null,
          summary, estimated: item.summary?.estimated ?? null,
          ...(compact ? {} : { files: item.files }),
        };
      });
      result[kind] = { status: records.length ? 'IMPORTED' : 'NOT_IMPORTED', latest: records[0] || null,
        ...(compact ? { scope: 'latest summary only; full rows in AI COPY' } : { snapshots: records }) };
    }
  }
  try {
    const state = JSON.parse(storage.getItem('vaIndexStatusV1') || '{}');
    if (!state || Array.isArray(state) || typeof state !== 'object') throw new Error('Invalid index state');
    const rows = Object.entries(state).map(([path, value]) => {
      if (!value || !['unknown', 'indexed', 'not_indexed'].includes(value.status)) throw new Error('Invalid index row');
      return { path, status: value.status, checkedAt: value.checkedAt || null };
    });
    result.index = { status: rows.length ? 'MANUAL_RECORDS' : 'NOT_CHECKED',
      ...(compact ? { recordedPages: rows.length } : { rows }) };
  } catch {
    result.index = { status: 'UNREADABLE' };
  }
  return result;
}
