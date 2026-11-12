'use strict';
const menu = document.querySelector('.pixel-menu');
const navigation = document.getElementById('pixel-navigation');
if (menu && navigation) {
  function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    navigation.dataset.open = String(open);
    menu.textContent = open ? 'CLOSE −' : 'MENU +';
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
}
if (location.hash === '#developer-message') {
  const note = document.getElementById('developer-message');
  if (note && note.tagName === 'DETAILS') note.open = true;
}
window.addEventListener('hashchange', () => {
  const note = document.getElementById('developer-message');
  if (location.hash === '#developer-message' && note && note.tagName === 'DETAILS') note.open = true;
});
