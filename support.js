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

const supportTabs = Array.from(document.querySelectorAll('[role="tablist"].support-tabs [role="tab"]'));
const supportPanels = supportTabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
if (supportTabs.length && supportPanels.every(Boolean)) {
  const selectSupportTab = (index, focus = false) => {
    supportTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      supportPanels[i].hidden = i !== index;
    });
    if (focus) supportTabs[index].focus();
  };
  supportTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSupportTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % supportTabs.length;
      else if (event.key === 'ArrowLeft') next = (index + supportTabs.length - 1) % supportTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = supportTabs.length - 1;
      else return;
      event.preventDefault();
      selectSupportTab(next, true);
    });
  });
  selectSupportTab(location.hash === '#music' ? 1 : 0);
  supportTabs[0].parentElement.hidden = false;
  window.addEventListener('hashchange', () => {
    if (location.hash === '#music') selectSupportTab(1);
    else if (location.hash === '#support-contribute') selectSupportTab(0);
  });
}
