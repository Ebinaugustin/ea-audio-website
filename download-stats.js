// Public release download counts. Add a registry entry and matching HTML for each plugin.
(() => {
  'use strict';
  const plugins = [{
    id: 'roommatch',
    repository: 'Ebinaugustin/EA-RoomMatch-Image-to-Reverb',
    matchers: {
      windows: /^EA[-_ ]RoomMatch.*Windows.*\.(?:zip|exe|msi)$/i,
      macArm: /^EA[-_ ]RoomMatch.*macos-arm64\.(?:pkg|dmg|zip)$/i,
      macIntel: /^EA[-_ ]RoomMatch.*macos-x64\.(?:pkg|dmg|zip)$/i
    },
    snapshot: {"counts":{"windows":102,"macArm":93,"macIntel":90},"checkedAt":"2026-10-16T16:40:59Z"}
  }];
  const cacheAge = 15 * 60 * 1000;
  const number = new Intl.NumberFormat('en');
  const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' });

  function validSnapshot(value, plugin) {
    return value && Number.isFinite(Date.parse(value.checkedAt)) &&
      Object.keys(plugin.matchers).every(key => Number.isSafeInteger(value.counts?.[key]) && value.counts[key] >= 0);
  }

  function render(roots, data, stale = false) {
    const total = Object.values(data.counts).reduce((sum, count) => sum + count, 0);
    roots.forEach(root => {
      root.querySelectorAll('[data-plugin-count]').forEach(node => {
        const key = node.dataset.pluginCount;
        const count = key === 'total' ? total : data.counts[key];
        if (Number.isSafeInteger(count)) node.textContent = number.format(count);
      });
      root.querySelectorAll('[data-count-updated]').forEach(node => {
        node.textContent = 'Last checked ' + date.format(new Date(data.checkedAt)) +
          (stale ? '. Showing the last available counts.' : '. Counts refresh periodically.');
      });
    });
  }

  async function readReleases(plugin) {
    const counts = Object.fromEntries(Object.keys(plugin.matchers).map(key => [key, 0]));
    const seen = new Set();
    // Read every release page so previous versions remain part of the total.
    for (let page = 1; ; page++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let releases;
      try {
        const response = await fetch('https://api.github.com/repos/' + plugin.repository +
          '/releases?per_page=100&page=' + page, {
          headers: { Accept: 'application/vnd.github+json' },
          credentials: 'omit',
          referrerPolicy: 'no-referrer',
          signal: controller.signal
        });
        if (!response.ok) throw new Error('Release counts unavailable');
        releases = await response.json();
        if (!Array.isArray(releases)) throw new Error('Invalid release list');
      } finally {
        clearTimeout(timeout);
      }
      for (const release of releases) {
        if (release.draft) continue;
        if (!Array.isArray(release.assets)) throw new Error('Missing release assets');
        for (const asset of release.assets) {
          if (seen.has(asset.id)) continue;
          const platform = Object.keys(plugin.matchers).find(key =>
            typeof asset.name === 'string' && plugin.matchers[key].test(asset.name));
          if (!platform || (asset.state && asset.state !== 'uploaded')) continue;
          if (!Number.isSafeInteger(asset.id) || !Number.isSafeInteger(asset.download_count) ||
              asset.download_count < 0) throw new Error('Invalid asset count');
          seen.add(asset.id);
          counts[platform] += asset.download_count;
          if (!Number.isSafeInteger(counts[platform])) throw new Error('Invalid count total');
        }
      }
      if (releases.length < 100) break;
    }
    return { counts, checkedAt: new Date().toISOString() };
  }

  async function update(plugin) {
    const roots = [...document.querySelectorAll('[data-plugin-stats="' + plugin.id + '"]')];
    if (!roots.length) return;
    const key = 'ea-download-counts-v1:' + plugin.repository;
    let current = plugin.snapshot;
    try {
      const cached = JSON.parse(localStorage.getItem(key));
      if (validSnapshot(cached, plugin) && Date.parse(cached.checkedAt) > Date.parse(current.checkedAt) &&
          Date.parse(cached.checkedAt) <= Date.now()) current = cached;
    } catch { /* Counts still work when storage is blocked. */ }
    render(roots, current);
    if (Date.now() - Date.parse(current.checkedAt) < cacheAge) return;
    try {
      const fresh = await readReleases(plugin);
      current = fresh;
      render(roots, current);
      try { localStorage.setItem(key, JSON.stringify(current)); } catch { /* Optional cache. */ }
    } catch {
      render(roots, current, true);
    }
  }

  plugins.forEach(update);
})();
