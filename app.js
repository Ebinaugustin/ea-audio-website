const views={overview:{src:'assets/roommatch-interface.png',alt:'RoomMatch beta interface showing photo input, scene analysis, an impulse response, and reverb controls'},room:{src:'assets/roommatch-3d.png',alt:'RoomMatch beta interface showing the interactive 3D room and source and listener positions'}};
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 const view=views[button.dataset.view];
 const image=document.getElementById('product-image');image.src=view.src;image.alt=view.alt;
 document.querySelectorAll('[data-view]').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
}));
Object.entries(window.EA_DOWNLOADS||{}).forEach(([platform,url])=>{
 if(!url)return;
 try{const parsed=new URL(url);if(parsed.protocol!=='https:')return;}catch{return;}
 const link=document.querySelector('[data-download="'+platform+'"]');
 if(link){link.href=url;link.removeAttribute('aria-disabled');if(link.querySelector('span').textContent==='Coming soon')link.querySelector('span').textContent='Beta 0.2.3 · Download ↗';}
});
