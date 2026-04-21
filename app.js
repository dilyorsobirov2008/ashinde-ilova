const ICONS = {
  all: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
  phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
  laptop: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>',
  tablet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
  watch: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>',
  audio: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
  plug: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>',
  tv: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>',
};

// DATA
const CATEGORIES = [
  {id:'barchasi',name:'Barchasi',icon:ICONS.all},
  {id:'smartfonlar',name:'Smartfonlar',icon:ICONS.phone},
  {id:'noutbuklar',name:'Noutbuklar',icon:ICONS.laptop},
  {id:'planshetlar',name:'Planshetlar',icon:ICONS.tablet},
  {id:'smartwatchlar',name:'Soatlar',icon:ICONS.watch},
  {id:'naushniklar',name:'Audio',icon:ICONS.audio},
  {id:'aksessuarlar',name:'Aksessuar',icon:ICONS.plug},
  {id:'televizorlar',name:'TV',icon:ICONS.tv},
];

const PRODUCTS = [
  {id:1,name:'iPhone 15 Pro Max 256GB',cat:'smartfonlar',icon:ICONS.phone,price:17500000,old:19000000,brand:'Apple',specs:{RAM:'8GB',Xotira:'256GB',Ekran:'6.7"',Kamera:'48MP',Batareya:'4422mAh'},desc:'iPhone 15 Pro Max — Apple\'ning eng kuchli smartfoni. A17 Pro chip, titanium korpus va professional kamera tizimi.'},
  {id:2,name:'Samsung Galaxy S24 Ultra',cat:'smartfonlar',icon:ICONS.phone,price:15900000,old:17500000,brand:'Samsung',specs:{RAM:'12GB',Xotira:'256GB',Ekran:'6.8"',Kamera:'200MP',Batareya:'5000mAh'},desc:'Galaxy S24 Ultra — Samsung\'ning flagman smartfoni. Built-in S Pen va AI funksiyalari bilan.'},
  {id:3,name:'MacBook Pro 14" M3',cat:'noutbuklar',icon:ICONS.laptop,price:28000000,old:null,brand:'Apple',specs:{Protsessor:'M3',RAM:'18GB',SSD:'512GB',Ekran:'14.2"',Batareya:'22 soat'},desc:'MacBook Pro M3 — professional ish uchun eng kuchli noutbuk.'},
  {id:4,name:'Dell XPS 15 i7',cat:'noutbuklar',icon:ICONS.laptop,price:22000000,old:25000000,brand:'Dell',specs:{Protsessor:'Intel i7-13700H',RAM:'16GB',SSD:'512GB',Ekran:'15.6" OLED',Batareya:'12 soat'},desc:'Dell XPS 15 — professional dizayn va yuqori unumdorlik.'},
  {id:5,name:'iPad Pro 12.9" M2',cat:'planshetlar',icon:ICONS.tablet,price:18500000,old:20000000,brand:'Apple',specs:{Chip:'M2',RAM:'8GB',Xotira:'256GB',Ekran:'12.9" Liquid Retina',Batareya:'10 soat'},desc:'iPad Pro — dunyodagi eng kuchli planshet.'},
  {id:6,name:'Samsung Galaxy Tab S9',cat:'planshetlar',icon:ICONS.tablet,price:12000000,old:null,brand:'Samsung',specs:{Protsessor:'Snapdragon 8 Gen 2',RAM:'8GB',Xotira:'128GB',Ekran:'11" AMOLED',Batareya:'8400mAh'},desc:'Galaxy Tab S9 — ish va o\'yin uchun eng yaxshi Android plansheti.'},
  {id:7,name:'Apple Watch Series 9 45mm',cat:'smartwatchlar',icon:ICONS.watch,price:6500000,old:7200000,brand:'Apple',specs:{Ekran:'1.9" OLED',Xotira:'64GB',GPS:'Ha',Suv:'WR50',Batareya:'18 soat'},desc:'Apple Watch Series 9 — salomatlik va fitness uchun eng yaxshi smart soat.'},
  {id:8,name:'Samsung Galaxy Watch 6',cat:'smartwatchlar',icon:ICONS.watch,price:4200000,old:null,brand:'Samsung',specs:{Ekran:'1.5" AMOLED',Xotira:'16GB',GPS:'Ha',Suv:'IP68',Batareya:'40 soat'},desc:'Galaxy Watch 6 — uzoq batareya va kuchli salomatlik sensori.'},
  {id:9,name:'AirPods Pro 2',cat:'naushniklar',icon:ICONS.audio,price:4800000,old:5500000,brand:'Apple',specs:{ANC:'Ha',Shaffoflik:'Ha',Batareya:'30 soat (keysda)',Chiqish:'3D audio',Suv:'IPX4'},desc:'AirPods Pro 2 — eng yaxshi shovqin bekor qiluvchi simsiz quloqchinlar.'},
  {id:10,name:'Sony WH-1000XM5',cat:'naushniklar',icon:ICONS.audio,price:3900000,old:4500000,brand:'Sony',specs:{ANC:'Ha',Batareya:'30 soat',Ulanish:'Bluetooth 5.2',Mikrofon:'8 ta',Og\'irligi:'250g'},desc:'Sony WH-1000XM5 — sanoatdagi eng yaxshi ANC texnologiyasi.'},
  {id:11,name:'Samsung 65" QLED 4K TV',cat:'televizorlar',icon:ICONS.tv,price:14500000,old:16000000,brand:'Samsung',specs:{Ekran:'65" QLED',Ruxsat:'4K',HDR:'HDR10+',Smart:'Tizen OS',HDMI:'4x HDMI'},desc:'Samsung QLED — boy ranglar va keskin tasvir uchun premium televizor.'},
  {id:12,name:'iPhone 14 128GB',cat:'smartfonlar',icon:ICONS.phone,price:10500000,old:12000000,brand:'Apple',specs:{RAM:'6GB',Xotira:'128GB',Ekran:'6.1"',Kamera:'12MP',Batareya:'3279mAh'},desc:'iPhone 14 — etarli unumdorlik va qulay narx.'},
  {id:13,name:'Xiaomi 14 Pro',cat:'smartfonlar',icon:ICONS.phone,price:9800000,old:null,brand:'Xiaomi',specs:{RAM:'12GB',Xotira:'256GB',Ekran:'6.73" AMOLED',Kamera:'50MP Leica',Batareya:'4880mAh'},desc:'Xiaomi 14 Pro — Leica kamera bilan flagman tajribasi.'},
  {id:14,name:'Anker USB-C Hub 7in1',cat:'aksessuarlar',icon:ICONS.plug,price:380000,old:450000,brand:'Anker',specs:{Portlar:'7 ta',USB:'3x USB-A',HDMI:'4K@60Hz',SD:'Ha',PD:'100W'},desc:'Universal USB-C hub barcha qurilmalar uchun.'},
  {id:15,name:'Baseus 65W Zaryadlovchi',cat:'aksessuarlar',icon:ICONS.plug,price:220000,old:null,brand:'Baseus',specs:{Quvvat:'65W',Port:'USB-C + USB-A',GaN:'Ha',Compact:'Ha'},desc:'GaN texnologiyasi bilan tez zaryadlovchi.'},
  {id:16,name:'Lenovo ThinkPad X1 Carbon',cat:'noutbuklar',icon:ICONS.laptop,price:26000000,old:28000000,brand:'Lenovo',specs:{Protsessor:'Intel i7-1365U',RAM:'16GB',SSD:'512GB',Ekran:'14" IPS',Batareya:'15 soat'},desc:'Biznes noutbuklari orasida eng yaxshi tanlov.'},
];

// STATE
let state = {
  page: 'home',
  prevPage: null,
  cart: JSON.parse(localStorage.getItem('cart')||'[]'),
  favs: JSON.parse(localStorage.getItem('favs')||'[]'),
  orders: JSON.parse(localStorage.getItem('orders')||'[]'),
  activeCat: 'barchasi',
  currentProduct: null,
};

// UTILS
function fmt(n){return n.toLocaleString('uz-UZ')+'  so\'m';}
function saveCart(){localStorage.setItem('cart',JSON.stringify(state.cart));}
function saveFavs(){localStorage.setItem('favs',JSON.stringify(state.favs));}
function saveOrders(){localStorage.setItem('orders',JSON.stringify(state.orders));}
function showToast(msg){
  const t=document.getElementById('liveToast');
  document.getElementById('toast-msg').innerHTML = '✨ ' + msg;
  const toast = new bootstrap.Toast(t);
  toast.show();
}
function monthlyPrice(price,months){return Math.round(price/months);}

// NAVIGATE
function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById('page-'+name);
  if(!target)return;
  target.classList.add('active');
  
  // Update navs
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  document.querySelectorAll('.drawer-link').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  
  state.prevPage=state.page;
  state.page=name;
  
  if(name==='cart')renderCart();
  if(name==='favorites')renderFavs();
  if(name==='orders')renderOrders();
  if(name==='catalog')renderCatalog();
  
  updateCartBadge();
  
  // Close offcanvas if open
  const drawerEl = document.getElementById('drawerMenu');
  const offcanvas = bootstrap.Offcanvas.getInstance(drawerEl);
  if(offcanvas) offcanvas.hide();

  // Close search
  const searchEl = document.getElementById('searchBar');
  const searchCollapse = bootstrap.Collapse.getInstance(searchEl);
  if(searchCollapse) searchCollapse.hide();

  window.scrollTo(0,0);
}

function updateCartBadge(){
  const total=state.cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').textContent=total;
  document.getElementById('nav-cart-count').textContent=total;
  document.getElementById('cart-count').style.display=total?'flex':'none';
  document.getElementById('nav-cart-count').style.display=total?'flex':'none';
}

// HOME
function renderHome(){
  renderBanners();
  renderCategories();
  renderFeatured();
  renderNew();
}

function renderBanners() {
  document.getElementById('banner-track').innerHTML = `
    <div class="banner-slide">
      <div class="banner-content">
        <span class="banner-tag">Yangi!</span>
        <h3 class="text-white fw-bold mb-1">Eng Yaxshi Smartfonlar</h3>
        <p class="text-white-50 mb-4 small">3-6-12 oy muddatli to'lov</p>
        <button class="btn btn-primary rounded-pill px-4 btn-y" data-page="catalog" data-cat="smartfonlar">Ko'rish <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ms-1"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
      </div>
      <svg class="bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect></svg>
    </div>
    <div class="banner-slide" style="background: linear-gradient(135deg, #001a1a, #111);">
      <div class="banner-content">
        <span class="banner-tag">Aksiya!</span>
        <h3 class="text-white fw-bold mb-1">Noutbuklar Chegirmada</h3>
        <p class="text-white-50 mb-4 small">Yetkazib berish bepul</p>
        <button class="btn btn-primary rounded-pill px-4 btn-y" data-page="catalog" data-cat="noutbuklar">Ko'rish <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ms-1"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
      </div>
      <svg class="bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect></svg>
    </div>
  `;
}

function renderCategories(){
  const g=document.getElementById('cats-scroll');
  g.innerHTML=CATEGORIES.map(c=>`
    <div class="cat-item" onclick="filterCat('${c.id}')">
      ${c.icon}
      <div class="cat-name">${c.name}</div>
    </div>`).join('');
}
function filterCat(id){
  state.activeCat=id;
  goPage('catalog');
}
function renderFeatured(){
  const items=PRODUCTS.filter(p=>p.old).slice(0,4);
  document.getElementById('featured-grid').innerHTML=items.map(p=>`<div class="col-6">${prodCard(p)}</div>`).join('');
}
function renderNew(){
  const items=PRODUCTS.slice(0,6);
  document.getElementById('new-scroll').innerHTML=items.map(p=>`<div style="width:160px; flex-shrink:0;">${prodCard(p)}</div>`).join('');
}

// PRODUCT CARD
function prodCard(p){
  const isFav=state.favs.includes(p.id);
  const disc=p.old?Math.round((1-p.price/p.old)*100):0;
  return`
  <div class="custom-card" onclick="openProduct(${p.id})">
    ${disc?`<span class="sale-badge">-${disc}%</span>`:''}
    <button class="fav-btn-abs" onclick="event.stopPropagation();toggleFav(${p.id})" style="color:${isFav?'#dc3545':'#fff'}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    </button>
    <div class="card-img-placeholder">${p.icon}</div>
    <div class="p-2 flex-grow-1 d-flex flex-column justify-content-between">
      <div>
        <div class="prod-name">${p.name}</div>
        ${p.old?`<div class="prod-old">${fmt(p.old)}</div>`:''}
        <div class="prod-price">${fmt(p.price)}</div>
      </div>
      <div class="prod-month">oyiga ${fmt(monthlyPrice(p.price,12))} / 12 oy</div>
    </div>
  </div>`;
}

// CATALOG
function renderCatalog(){
  const tabs=document.getElementById('filter-tabs');
  tabs.innerHTML=CATEGORIES.map(c=>`<button class="filter-tab${c.id===state.activeCat?' active':''}" onclick="setCat('${c.id}')">${c.name}</button>`).join('');
  applyFilter();
}
function setCat(id){
  state.activeCat=id;
  renderCatalog();
}
function applyFilter(){
  const sort=document.getElementById('sort-sel').value;
  let items=state.activeCat==='barchasi'?[...PRODUCTS]:PRODUCTS.filter(p=>p.cat===state.activeCat);
  if(sort==='price-asc')items.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc')items.sort((a,b)=>b.price-a.price);
  document.getElementById('prod-count').textContent=items.length+' ta mahsulot';
  document.getElementById('catalog-grid').innerHTML=items.map(p=>`<div class="col-6">${prodCard(p)}</div>`).join('');
}

// PRODUCT DETAIL
function openProduct(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  state.currentProduct=p;
  const isFav=state.favs.includes(p.id);
  const inCart=state.cart.find(c=>c.id===p.id);
  const specs=Object.entries(p.specs).map(([k,v])=>`<div class="d-flex justify-content-between py-2 border-bottom border-secondary small"><span class="text-muted">${k}</span><span class="fw-bold">${v}</span></div>`).join('');
  document.getElementById('product-detail').innerHTML=`
    <div class="card-img-placeholder mb-3 border-0 bg-transparent" style="font-size:7rem; color:#888;">${p.icon}</div>
    <div class="px-3">
      <div class="text-muted text-uppercase small fw-bold mb-1 tracking-wide">${CATEGORIES.find(c=>c.id===p.cat)?.name||''}</div>
      <h4 class="fw-bold mb-3">${p.name}</h4>
      <h2 class="text-primary fw-bolder mb-1">${fmt(p.price)}</h2>
      ${p.old?`<div class="text-muted text-decoration-line-through mb-3">${fmt(p.old)}</div>`:''}
      
      <div class="d-flex gap-2 mb-4">
        ${[3,6,12].map(m=>`
          <div class="flex-fill bg-surface border border-secondary rounded-3 p-2 text-center">
            <small class="text-muted d-block">${m} oy</small>
            <strong class="text-primary small">${fmt(monthlyPrice(p.price,m))}</strong>
          </div>
        `).join('')}
      </div>
      
      <p class="text-white-50 mb-4 lh-lg small">${p.desc}</p>
      
      <div class="bg-surface rounded-4 p-3 mb-4 border border-secondary">
        <h6 class="fw-bold mb-3">Xususiyatlari</h6>
        ${specs}
      </div>
      
      <div class="d-flex gap-2">
        <button class="btn btn-primary flex-grow-1 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" onclick="addToCart(${p.id})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          ${inCart?'Savatda':'Savatga qo\'shish'}
        </button>
        <button class="btn-fav-det${isFav?' liked':''}" id="det-fav-btn" onclick="toggleFav(${p.id});updateDetFav()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
    </div>`;
  goPage('product');
}
function updateDetFav(){
  if(!state.currentProduct)return;
  const isFav=state.favs.includes(state.currentProduct.id);
  const btn=document.getElementById('det-fav-btn');
  if(btn){
    btn.innerHTML=`<svg width="24" height="24" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
    btn.className='btn-fav-det'+(isFav?' liked':'');
  }
}

// CART
function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  const ex=state.cart.find(c=>c.id===id);
  if(ex)ex.qty++;
  else state.cart.push({id,qty:1});
  saveCart();updateCartBadge();
  showToast("Savatga qo'shildi!");
  renderHome();
  if(state.page==='catalog')renderCatalog();
  if(state.page==='product')openProduct(state.currentProduct.id);
}
function changeQty(id,d){
  const ex=state.cart.find(c=>c.id===id);
  if(!ex)return;
  ex.qty+=d;
  if(ex.qty<=0)state.cart=state.cart.filter(c=>c.id!==id);
  saveCart();updateCartBadge();renderCart();
}
function removeFromCart(id){
  state.cart=state.cart.filter(c=>c.id!==id);
  saveCart();updateCartBadge();renderCart();
}
function renderCart(){
  const el=document.getElementById('cart-content');
  if(!state.cart.length){
    el.innerHTML=`<div class="text-center text-muted p-5 mt-4"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><br><h5>Savat bo'sh</h5></div>`;return;
  }
  const total=state.cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0);
  const delivery=total>500000?0:30000;
  
  let itemsHtml = state.cart.map(i=>{
    const p=PRODUCTS.find(x=>x.id===i.id);if(!p)return'';
    return`
    <div class="d-flex align-items-center gap-3 bg-surface p-3 mx-3 mb-3 rounded-4 border border-secondary">
      <div class="text-muted" style="width:48px;height:48px;">${p.icon}</div>
      <div class="flex-grow-1 min-w-0">
        <div class="text-truncate small fw-bold mb-1">${p.name}</div>
        <div class="text-primary fw-bold mb-2">${fmt(p.price)}</div>
        <div class="d-flex align-items-center gap-3">
          <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
          <span class="fw-bold">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
        </div>
      </div>
      <button class="btn btn-link text-danger p-0 align-self-start" onclick="removeFromCart(${p.id})">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    </div>`;
  }).join('');
  
  el.innerHTML = itemsHtml + `
  <div class="bg-surface p-4 mx-3 mb-3 rounded-4 border border-secondary mt-2">
    <div class="d-flex justify-content-between mb-2 small text-muted"><span>Mahsulotlar</span><span>${fmt(total)}</span></div>
    <div class="d-flex justify-content-between mb-3 small text-muted"><span>Yetkazish</span><span>${delivery?fmt(delivery):'Bepul'}</span></div>
    <div class="d-flex justify-content-between pt-3 border-top border-secondary fw-bold fs-5 text-primary"><span>Jami</span><span>${fmt(total+delivery)}</span></div>
    <button class="btn btn-primary w-100 rounded-pill mt-4 fw-bold p-3" onclick="openOrderModal()">Buyurtma berish</button>
  </div>`;
}

// FAVORITES
function toggleFav(id){
  if(state.favs.includes(id))state.favs=state.favs.filter(f=>f!==id);
  else{state.favs.push(id);showToast("Sevimlilarga qo'shildi!");}
  saveFavs();
  if(state.page==='favorites')renderFavs();
  if(state.page==='home')renderHome();
  if(state.page==='catalog')renderCatalog();
}
function renderFavs(){
  const el=document.getElementById('favs-content');
  const items=PRODUCTS.filter(p=>state.favs.includes(p.id));
  if(!items.length){
    el.innerHTML=`<div class="text-center text-muted p-5 mt-4"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-3"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg><br><h5>Sevimlilar bo'sh</h5></div>`;return;
  }
  el.innerHTML=items.map(p=>`<div class="col-6">${prodCard(p)}</div>`).join('');
}

// ORDERS
function openOrderModal(){
  const total=state.cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0);
  document.getElementById('modal-body').innerHTML=`
    <div class="mb-3">
      <label class="form-label">Ismingiz</label>
      <input id="o-name" class="form-control" placeholder="Ism Familiya" type="text"/>
    </div>
    <div class="mb-3">
      <label class="form-label">Telefon raqam</label>
      <input id="o-phone" class="form-control" placeholder="+998 __ ___ __ __" type="tel"/>
    </div>
    <div class="mb-3">
      <label class="form-label">Manzil</label>
      <input id="o-addr" class="form-control" placeholder="Toshkent, ko'cha, uy..." type="text"/>
    </div>
    <div class="mb-3">
      <label class="form-label">To'lov usuli</label>
      <select id="o-pay" class="form-select">
        <option value="naqd">Naqd pul</option>
        <option value="karta">Bank kartasi</option>
        <option value="muddatli">Muddatli to'lov</option>
      </select>
    </div>
    <div id="inst-wrap" class="d-none mb-3">
      <label class="form-label">Muddatni tanlang</label>
      <div class="d-flex gap-2">
        ${[3,6,12].map(m=>`
          <div class="flex-fill bg-surface border border-secondary rounded-3 p-2 text-center inst-opt" onclick="selInst(this)" style="cursor:pointer">
            <small class="text-muted d-block">${m} oy</small>
            <strong class="text-primary small">${fmt(Math.round(total/m))}</strong>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="mb-4">
      <label class="form-label">Izoh</label>
      <textarea id="o-note" class="form-control" rows="2" placeholder="Qo'shimcha ma'lumot..."></textarea>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <span class="fw-bold">Jami:</span>
      <strong class="text-primary fs-5">${fmt(total)}</strong>
    </div>
    <button class="btn btn-primary w-100 rounded-pill p-3 fw-bold" onclick="submitOrder()">✅ Tasdiqlash</button>`;
    
  document.getElementById('o-pay').addEventListener('change',function(){
    document.getElementById('inst-wrap').classList.toggle('d-none', this.value !== 'muddatli');
  });
  
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('orderModal'));
  offcanvas.show();
}

function selInst(el){
  document.querySelectorAll('.inst-opt').forEach(o=>{o.classList.remove('border-primary'); o.style.background='var(--bs-secondary-bg)';});
  el.classList.add('border-primary');
  el.style.background='rgba(250,204,21,0.1)';
}

function submitOrder(){
  const name=document.getElementById('o-name').value.trim();
  const phone=document.getElementById('o-phone').value.trim();
  if(!name||!phone){showToast('Ism va telefon kiriting!');return;}
  const order={
    id:'#'+Math.floor(10000+Math.random()*90000),
    date:new Date().toLocaleDateString('uz-UZ'),
    items:state.cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return p?`${p.name} x${i.qty}`:'';}),
    total:state.cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0),
    status:'Qabul qilindi',name,phone,
  };
  state.orders.unshift(order);
  state.cart=[];
  saveCart();saveOrders();updateCartBadge();
  
  const modal = bootstrap.Offcanvas.getInstance(document.getElementById('orderModal'));
  if(modal) modal.hide();
  
  showToast('Buyurtma qabul qilindi!');
  goPage('orders');
}

function renderOrders(){
  const el=document.getElementById('orders-content');
  if(!state.orders.length){
    el.innerHTML=`<div class="text-center text-muted p-5 mt-4"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-3"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><br><h5>Buyurtmalar yo'q</h5></div>`;return;
  }
  el.innerHTML=state.orders.map(o=>`
    <div class="bg-surface rounded-4 p-3 mb-3 border border-secondary border-start border-primary border-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="small text-muted">${o.id} · ${o.date}</span>
        <span class="badge bg-primary text-dark rounded-pill">${o.status}</span>
      </div>
      <div class="small text-white-50 mb-2">${o.items.join(', ')}</div>
      <div class="fw-bold text-primary">${fmt(o.total)}</div>
    </div>`).join('');
}

// SEARCH
function doSearch(q){
  if(!q.trim()){renderCatalog();return;}
  const results=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.brand.toLowerCase().includes(q.toLowerCase()));
  document.getElementById('catalog-grid').innerHTML=results.length?results.map(p=>`<div class="col-6">${prodCard(p)}</div>`).join(''):`<div class="col-12 text-center text-muted py-5"><p>"${q}" bo'yicha hech narsa topilmadi</p></div>`;
  document.getElementById('prod-count').textContent=results.length+' ta natija';
}

// EVENTS
document.addEventListener('DOMContentLoaded',()=>{
  renderHome();
  updateCartBadge();

  // Banner buttons delegation
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-y');
    if(btn) {
      const pg = btn.dataset.page;
      const cat = btn.dataset.cat;
      if(cat) state.activeCat = cat;
      if(pg) goPage(pg);
    }
  });

  document.querySelectorAll('.nav-btn').forEach(el=>{
    el.addEventListener('click',function(e){
      const pg=this.dataset.page;
      if(pg)goPage(pg);
    });
  });

  document.querySelectorAll('.drawer-link').forEach(el=>{
    el.addEventListener('click',function(e){
      e.preventDefault();
      const pg=this.dataset.page;
      if(pg)goPage(pg);
    });
  });

  // Search input
  const sInp = document.getElementById('search-input');
  if(sInp) {
    sInp.addEventListener('input',function(){doSearch(this.value);});
    sInp.addEventListener('focus', function() {
      if(state.page !== 'catalog') goPage('catalog');
    });
  }

  // Sort
  const sSel = document.getElementById('sort-sel');
  if(sSel) sSel.addEventListener('change',applyFilter);
});
