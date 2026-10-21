'use strict';
const copyUpi = document.getElementById('copy-support-upi');
const copyStatus = document.getElementById('support-copy-status');
if (copyUpi && copyStatus) copyUpi.addEventListener('click', async () => {
  const upiId = document.getElementById('support-upi-id').textContent.trim();
  try {
    await navigator.clipboard.writeText(upiId);
    copyStatus.textContent = 'UPI ID copied. Paste it into Google Pay or another UPI app, then check the recipient before paying.';
  } catch {
    copyStatus.textContent = 'Copy is unavailable in this browser. Select and copy the UPI ID above, then paste it into your UPI app.';
  }
});
