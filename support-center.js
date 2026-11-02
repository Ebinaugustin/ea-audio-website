(() => {
  const form = document.getElementById('bug-form');
  const plugin = document.getElementById('plugin');
  const status = document.getElementById('report-status');
  const requested = new URLSearchParams(location.search).get('plugin');
  if ([...plugin.options].some(o => o.value === requested)) plugin.value = requested;
  function report() {
    const f = new FormData(form), name = plugin.selectedOptions[0].text;
    return { subject: `[${name}] ${f.get('subject')}`, body: `Plugin: ${name}\nVersion: ${f.get('version')}\nOperating system: ${f.get('os')}\nDAW: ${f.get('daw')}\n\n${f.get('description')}` };
  }
  form.addEventListener('submit', e => {
    e.preventDefault(); const r = report();
    const url = `mailto:ebin.augustin55@gmail.com?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`;
    if (url.length > 1800) { status.textContent = 'This report is too long for some email apps. Use Copy report, then paste it into an email to ebin.augustin55@gmail.com.'; return; }
    location.href = url;
    status.textContent = 'Your email draft has been prepared. Send it from your email app. Nothing has been submitted through this website.';
  });
  document.getElementById('copy-report').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const r = report();
    try { await navigator.clipboard.writeText(`${r.subject}\n\n${r.body}`); status.textContent = 'Report copied. Paste it into an email to ebin.augustin55@gmail.com and attach any screenshots there.'; }
    catch { status.textContent = 'Copy is unavailable in this browser. Email the details above to ebin.augustin55@gmail.com.'; }
  });
})();
