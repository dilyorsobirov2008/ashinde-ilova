// DATA
const CATEGORIES = [
  {id:'barchasi',name:'Barchasi',icon:'🏪'},
  {id:'smartfonlar',name:'Smartfonlar',icon:'📱'},
  {id:'noutbuklar',name:'Noutbuklar',icon:'💻'},
  {id:'planshetlar',name:'Planshetlar',icon:'📟'},
  {id:'smartwatchlar',name:'Soatlar',icon:'⌚'},
  {id:'naushniklar',name:'Audio',icon:'🎧'},
  {id:'aksessuarlar',name:'Aksessuar',icon:'🔌'},
  {id:'televizorlar',name:'TV',icon:'📺'},
];

const PRODUCTS = [
  {id:1,name:'iPhone 15 Pro Max 256GB',cat:'smartfonlar',icon:'📱',price:17500000,old:19000000,brand:'Apple',specs:{RAM:'8GB',Xotira:'256GB',Ekran:'6.7"',Kamera:'48MP',Batareya:'4422mAh'},desc:'iPhone 15 Pro Max — Apple\'ning eng kuchli smartfoni. A17 Pro chip, titanium korpus va professional kamera tizimi.'},
  {id:2,name:'Samsung Galaxy S24 Ultra',cat:'smartfonlar',icon:'📱',price:15900000,old:17500000,brand:'Samsung',specs:{RAM:'12GB',Xotira:'256GB',Ekran:'6.8"',Kamera:'200MP',Batareya:'5000mAh'},desc:'Galaxy S24 Ultra — Samsung\'ning flagman smartfoni. Built-in S Pen va AI funksiyalari bilan.'},
  {id:3,name:'MacBook Pro 14" M3',cat:'noutbuklar',icon:'💻',price:28000000,old:null,brand:'Apple',specs:{Protsessor:'M3',RAM:'18GB',SSD:'512GB',Ekran:'14.2"',Batareya:'22 soat'},desc:'MacBook Pro M3 — professional ish uchun eng kuchli noutbuk.'},
  {id:4,name:'Dell XPS 15 i7',cat:'noutbuklar',icon:'💻',price:22000000,old:25000000,brand:'Dell',specs:{Protsessor:'Intel i7-13700H',RAM:'16GB',SSD:'512GB',Ekran:'15.6" OLED',Batareya:'12 soat'},desc:'Dell XPS 15 — professional dizayn va yuqori unumdorlik.'},
  {id:5,name:'iPad Pro 12.9" M2',cat:'planshetlar',icon:'📟',price:18500000,old:20000000,brand:'Apple',specs:{Chip:'M2',RAM:'8GB',Xotira:'256GB',Ekran:'12.9" Liquid Retina',Batareya:'10 soat'},desc:'iPad Pro — dunyodagi eng kuchli planshet.'},
  {id:6,name:'Samsung Galaxy Tab S9',cat:'planshetlar',icon:'📟',price:12000000,old:null,brand:'Samsung',specs:{Protsessor:'Snapdragon 8 Gen 2',RAM:'8GB',Xotira:'128GB',Ekran:'11" AMOLED',Batareya:'8400mAh'},desc:'Galaxy Tab S9 — ish va o\'yin uchun eng yaxshi Android plansheti.'},
  {id:7,name:'Apple Watch Series 9 45mm',cat:'smartwatchlar',icon:'⌚',price:6500000,old:7200000,brand:'Apple',specs:{Ekran:'1.9" OLED',Xotira:'64GB',GPS:'Ha',Suv:'WR50',Batareya:'18 soat'},desc:'Apple Watch Series 9 — salomatlik va fitness uchun eng yaxshi smart soat.'},
  {id:8,name:'Samsung Galaxy Watch 6',cat:'smartwatchlar',icon:'⌚',price:4200000,old:null,brand:'Samsung',specs:{Ekran:'1.5" AMOLED',Xotira:'16GB',GPS:'Ha',Suv:'IP68',Batareya:'40 soat'},desc:'Galaxy Watch 6 — uzoq batareya va kuchli salomatlik sensori.'},
  {id:9,name:'AirPods Pro 2',cat:'naushniklar',icon:'🎧',price:4800000,old:5500000,brand:'Apple',specs:{ANC:'Ha',Shaffoflik:'Ha',Batareya:'30 soat (keysda)',Chiqish:'3D audio',Suv:'IPX4'},desc:'AirPods Pro 2 — eng yaxshi shovqin bekor qiluvchi simsiz quloqchinlar.'},
  {id:10,name:'Sony WH-1000XM5',cat:'naushniklar',icon:'🎧',price:3900000,old:4500000,brand:'Sony',specs:{ANC:'Ha',Batareya:'30 soat',Ulanish:'Bluetooth 5.2',Mikrofon:'8 ta',Og\'irligi:'250g'},desc:'Sony WH-1000XM5 — sanoatdagi eng yaxshi ANC texnologiyasi.'},
  {id:11,name:'Samsung 65" QLED 4K TV',cat:'televizorlar',icon:'📺',price:14500000,old:16000000,brand:'Samsung',specs:{Ekran:'65" QLED',Ruxsat:'4K',HDR:'HDR10+',Smart:'Tizen OS',HDMI:'4x HDMI'},desc:'Samsung QLED — boy ranglar va keskin tasvir uchun premium televizor.'},
  {id:12,name:'iPhone 14 128GB',cat:'smartfonlar',icon:'📱',price:10500000,old:12000000,brand:'Apple',specs:{RAM:'6GB',Xotira:'128GB',Ekran:'6.1"',Kamera:'12MP',Batareya:'3279mAh'},desc:'iPhone 14 — etarli unumdorlik va qulay narx.'},
  {id:13,name:'Xiaomi 14 Pro',cat:'smartfonlar',icon:'📱',price:9800000,old:null,brand:'Xiaomi',specs:{RAM:'12GB',Xotira:'256GB',Ekran:'6.73" AMOLED',Kamera:'50MP Leica',Batareya:'4880mAh'},desc:'Xiaomi 14 Pro — Leica kamera bilan flagman tajribasi.'},
  {id:14,name:'Anker USB-C Hub 7in1',cat:'aksessuarlar',icon:'🔌',price:380000,old:450000,brand:'Anker',specs:{Portlar:'7 ta',USB:'3x USB-A',HDMI:'4K@60Hz',SD:'Ha',PD:'100W'},desc:'Universal USB-C hub barcha qurilmalar uchun.'},
  {id:15,name:'Baseus 65W Zaryadlovchi',cat:'aksessuarlar',icon:'🔌',price:220000,old:null,brand:'Baseus',specs:{Quvvat:'65W',Port:'USB-C + USB-A',GaN:'Ha',Compact:'Ha'},desc:'GaN texnologiyasi bilan tez zaryadlovchi.'},
  {id:16,name:'Lenovo ThinkPad X1 Carbon',cat:'noutbuklar',icon:'💻',price:26000000,old:28000000,brand:'Lenovo',specs:{Protsessor:'Intel i7-1365U',RAM:'16GB',SSD:'512GB',Ekran:'14" IPS',Batareya:'15 soat'},desc:'Biznes noutbuklari orasida eng yaxshi tanlov.'},
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
  bannerIdx: 0,
};

// UTILS
function fmt(n){return n.toLocaleString('uz-UZ')+'  so\'m';}
function saveCart(){localStorage.setItem('cart',JSON.stringify(state.cart));}
function saveFavs(){localStorage.setItem('favs',JSON.stringify(state.favs));}
function saveOrders(){localStorage.setItem('orders',JSON.stringify(state.orders));}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.remove('hidden');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.add('hidden'),2200);
}
function monthlyPrice(price,months){return Math.round(price/months);}

// DRAWER — global scope
function closeDrawer(){
  const drawer=document.getElementById('drawer');
  const overlay=document.getElementById('overlay');
  if(drawer)drawer.classList.add('hidden'),drawer.classList.remove('open');
  if(overlay)overlay.classList.add('hidden');
}

// NAVIGATE
function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById('page-'+name);
  if(!target)return;
  target.classList.add('active');
  document.querySelectorAll('.bn').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  document.querySelectorAll('.d-item').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  state.prevPage=state.page;
  state.page=name;
  if(name==='cart')renderCart();
  if(name==='favorites')renderFavs();
  if(name==='orders')renderOrders();
  if(name==='catalog')renderCatalog();
  updateCartBadge();
  closeDrawer();
  const main=document.querySelector('.main');
  if(main)main.scrollTop=0;
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
  renderCategories();
  renderFeatured();
  renderNew();
}
function renderCategories(){
  const g=document.getElementById('cats-grid');
  g.innerHTML=CATEGORIES.map(c=>`
    <div class="cat-item" onclick="filterCat('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
    </div>`).join('');
}
function filterCat(id){
  state.activeCat=id;
  goPage('catalog');
}
function renderFeatured(){
  const items=PRODUCTS.filter(p=>p.old).slice(0,4);
  document.getElementById('featured-grid').innerHTML=items.map(prodCard).join('');
}
function renderNew(){
  const items=PRODUCTS.slice(0,6);
  document.getElementById('new-scroll').innerHTML=items.map(prodCard).join('');
}

// PRODUCT CARD
function prodCard(p){
  const isFav=state.favs.includes(p.id);
  const disc=p.old?Math.round((1-p.price/p.old)*100):0;
  return`<div class="prod-card" onclick="openProduct(${p.id})">
    ${disc?`<span class="sale-tag">-${disc}%</span>`:''}
    <button class="fav-btn" onclick="event.stopPropagation();toggleFav(${p.id})" style="color:${isFav?'#ef4444':'#fff'}">${isFav?'❤️':'🤍'}</button>
    <div class="prod-img">${p.icon}</div>
    <div class="prod-body">
      <div class="prod-name">${p.name}</div>
      <div class="prod-price">${fmt(p.price)}</div>
      ${p.old?`<div class="prod-old">${fmt(p.old)}</div>`:''}
      <div class="prod-month">oyiga ${fmt(monthlyPrice(p.price,12))} / 12 oy</div>
    </div>
  </div>`;
}

// CATALOG
function renderCatalog(){
  const tabs=document.getElementById('filter-tabs');
  tabs.innerHTML=CATEGORIES.map(c=>`<button class="ftab${c.id===state.activeCat?' active':''}" onclick="setCat('${c.id}')">${c.icon} ${c.name}</button>`).join('');
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
  document.getElementById('catalog-grid').innerHTML=items.map(prodCard).join('');
}

// PRODUCT DETAIL
function openProduct(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  state.currentProduct=p;
  const isFav=state.favs.includes(p.id);
  const inCart=state.cart.find(c=>c.id===p.id);
  const specs=Object.entries(p.specs).map(([k,v])=>`<div class="spec-row"><span>${k}</span><span>${v}</span></div>`).join('');
  document.getElementById('product-detail').innerHTML=`
    <div class="det-imgs">${p.icon}</div>
    <div class="det-body">
      <div class="det-cat">${CATEGORIES.find(c=>c.id===p.cat)?.name||''}</div>
      <div class="det-name">${p.name}</div>
      <div class="det-price">${fmt(p.price)}</div>
      ${p.old?`<div class="det-old">${fmt(p.old)}</div>`:''}
      <div class="det-months">
        ${[3,6,12].map(m=>`<div class="month-chip"><small>${m} oy</small><strong>${fmt(monthlyPrice(p.price,m))}</strong></div>`).join('')}
      </div>
      <div class="det-desc">${p.desc}</div>
      <div class="det-specs">${specs}</div>
      <div class="det-actions">
        <button class="btn-cart-det" onclick="addToCart(${p.id})">${inCart?'✅ Savatda':'🛒 Savatga qo\'shish'}</button>
        <button class="btn-fav-det${isFav?' liked':''}" id="det-fav-btn" onclick="toggleFav(${p.id});updateDetFav()">${isFav?'❤️':'🤍'}</button>
      </div>
    </div>`;
  goPage('product');
}
function updateDetFav(){
  if(!state.currentProduct)return;
  const isFav=state.favs.includes(state.currentProduct.id);
  const btn=document.getElementById('det-fav-btn');
  if(btn){btn.textContent=isFav?'❤️':'🤍';btn.className='btn-fav-det'+(isFav?' liked':'');}
}

// CART
function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  const ex=state.cart.find(c=>c.id===id);
  if(ex)ex.qty++;
  else state.cart.push({id,qty:1});
  saveCart();updateCartBadge();
  showToast('✅ Savatga qo\'shildi!');
  renderHome();
  if(state.page==='catalog')renderCatalog();
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
    el.innerHTML=`<div class="empty-state"><div class="es-icon">🛒</div><h3>Savat bo'sh</h3><p>Mahsulotlarni savatga qo'shing</p></div>`;return;
  }
  const total=state.cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0);
  const delivery=total>500000?0:30000;
  el.innerHTML=state.cart.map(i=>{
    const p=PRODUCTS.find(x=>x.id===i.id);if(!p)return'';
    return`<div class="cart-item">
      <div class="ci-emoji">${p.icon}</div>
      <div class="ci-info">
        <div class="ci-name">${p.name}</div>
        <div class="ci-price">${fmt(p.price)}</div>
        <div class="ci-qty">
          <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
          <span class="qty-num">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
        </div>
      </div>
      <button class="ci-del" onclick="removeFromCart(${p.id})">🗑</button>
    </div>`;
  }).join('')+
  `<div class="cart-total">
    <div class="ct-row"><span>Mahsulotlar</span><span>${fmt(total)}</span></div>
    <div class="ct-row"><span>Yetkazib berish</span><span>${delivery?fmt(delivery):'Bepul'}</span></div>
    <div class="ct-row total"><span>Jami</span><span>${fmt(total+delivery)}</span></div>
    <button class="btn-order" onclick="openOrderModal()">📋 Buyurtma berish</button>
  </div>`;
}

// FAVORITES
function toggleFav(id){
  if(state.favs.includes(id))state.favs=state.favs.filter(f=>f!==id);
  else{state.favs.push(id);showToast('❤️ Sevimlilarga qo\'shildi!');}
  saveFavs();
  if(state.page==='favorites')renderFavs();
  if(state.page==='home')renderHome();
  if(state.page==='catalog')renderCatalog();
}
function renderFavs(){
  const el=document.getElementById('favs-content');
  const items=PRODUCTS.filter(p=>state.favs.includes(p.id));
  if(!items.length){
    el.innerHTML=`<div class="empty-state"><div class="es-icon">❤️</div><h3>Sevimlilar bo'sh</h3><p>Yoqqan mahsulotlarni saqlang</p></div>`;return;
  }
  el.innerHTML=`<div class="prod-grid" style="padding:14px">${items.map(prodCard).join('')}</div>`;
}

// ORDERS
function openOrderModal(){
  const total=state.cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0);
  document.getElementById('modal-body').innerHTML=`
    <div class="form-group"><label>Ismingiz</label><input id="o-name" placeholder="Ism Familiya" type="text"/></div>
    <div class="form-group"><label>Telefon raqam</label><input id="o-phone" placeholder="+998 __ ___ __ __" type="tel"/></div>
    <div class="form-group"><label>Manzil</label><input id="o-addr" placeholder="Toshkent, ko'cha, uy..." type="text"/></div>
    <div class="form-group"><label>To'lov usuli</label>
      <select id="o-pay"><option value="naqd">Naqd pul</option><option value="karta">Bank kartasi</option><option value="muddatli">Muddatli to'lov</option></select>
    </div>
    <div id="inst-wrap" class="hidden">
      <label style="font-size:.82rem;color:#888;margin-bottom:6px;display:block">Muddatni tanlang</label>
      <div class="installment-opts">
        ${[3,6,12].map(m=>`<div class="inst-opt${m===12?' active':''}" onclick="selInst(${m},${total})"><small>${m} oy</small><strong>${fmt(Math.round(total/m))}</strong></div>`).join('')}
      </div>
    </div>
    <div class="form-group"><label>Izoh</label><textarea id="o-note" placeholder="Qo'shimcha ma'lumot..."></textarea></div>
    <div class="ct-row total" style="margin-bottom:14px"><span>Jami</span><strong style="color:#FACC15">${fmt(total)}</strong></div>
    <button class="btn-order" onclick="submitOrder()">✅ Tasdiqlash</button>`;
  document.getElementById('o-pay').addEventListener('change',function(){
    document.getElementById('inst-wrap').classList.toggle('hidden',this.value!=='muddatli');
  });
  document.getElementById('modal-bg').classList.remove('hidden');
}
function selInst(m,total){
  document.querySelectorAll('.inst-opt').forEach(o=>o.classList.remove('active'));
  event.currentTarget.classList.add('active');
}
function submitOrder(){
  const name=document.getElementById('o-name').value.trim();
  const phone=document.getElementById('o-phone').value.trim();
  if(!name||!phone){showToast('⚠️ Ism va telefon kiriting!');return;}
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
  document.getElementById('modal-bg').classList.add('hidden');
  showToast('🎉 Buyurtma qabul qilindi!');
  goPage('orders');
}
function renderOrders(){
  const el=document.getElementById('orders-content');
  if(!state.orders.length){
    el.innerHTML=`<div class="empty-state"><div class="es-icon">📋</div><h3>Buyurtmalar yo'q</h3><p>Birinchi buyurtmangizni bering</p></div>`;return;
  }
  el.innerHTML=state.orders.map(o=>`
    <div class="order-card">
      <div class="oc-head"><span class="oc-id">${o.id} · ${o.date}</span><span class="oc-status">${o.status}</span></div>
      <div class="oc-items">${o.items.join(', ')}</div>
      <div class="oc-total">${fmt(o.total)}</div>
    </div>`).join('');
}

// SEARCH
function doSearch(q){
  if(!q.trim()){renderCatalog();return;}
  const results=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.brand.toLowerCase().includes(q.toLowerCase()));
  document.getElementById('catalog-grid').innerHTML=results.length?results.map(prodCard).join(''):`<div class="empty-state" style="grid-column:span 2"><div class="es-icon">🔍</div><h3>Topilmadi</h3><p>"${q}" bo'yicha hech narsa yo'q</p></div>`;
  document.getElementById('prod-count').textContent=results.length+' ta natija';
}

// BANNER SLIDER
function initBanner(){
  let t=setInterval(()=>{
    state.bannerIdx=(state.bannerIdx+1)%3;
    document.getElementById('banner-track').style.transform=`translateX(-${state.bannerIdx*100}%)`;
    document.querySelectorAll('.bdot').forEach((d,i)=>d.classList.toggle('active',i===state.bannerIdx));
  },3500);
}

// EVENTS
document.addEventListener('DOMContentLoaded',()=>{

  renderHome();
  updateCartBadge();
  initBanner();

  // Bottom nav
  document.querySelectorAll('.bn').forEach(el=>{
    el.addEventListener('click',function(){
      const pg=this.dataset.page;
      if(pg)goPage(pg);
    });
  });

  // Drawer nav items
  document.querySelectorAll('.d-item').forEach(el=>{
    el.addEventListener('click',function(){
      const pg=this.dataset.page;
      if(pg)goPage(pg);
    });
  });

  // Banner buttons
  document.querySelectorAll('.btn-y[data-page]').forEach(el=>{
    el.addEventListener('click',function(){
      const pg=this.dataset.page;
      const cat=this.dataset.cat;
      if(cat)state.activeCat=cat;
      if(pg)goPage(pg);
    });
  });

  // Drawer toggle
  document.getElementById('menu-btn').onclick=()=>{
    const drawer=document.getElementById('drawer');
    const overlay=document.getElementById('overlay');
    drawer.classList.toggle('hidden');
    drawer.classList.toggle('open');
    overlay.classList.toggle('hidden');
  };
  document.getElementById('drawer-close').onclick=closeDrawer;
  document.getElementById('overlay').onclick=closeDrawer;

  // Logo → home
  document.getElementById('logo-btn').onclick=()=>goPage('home');

  // Cart btn
  document.getElementById('cart-btn').onclick=()=>goPage('cart');

  // Search
  document.getElementById('search-btn').onclick=()=>{
    const wrap=document.getElementById('search-wrap');
    wrap.classList.toggle('hidden');
    if(!wrap.classList.contains('hidden')){
      document.getElementById('search-input').focus();
      if(state.page!=='catalog')goPage('catalog');
    }
  };
  document.getElementById('search-close').onclick=()=>{
    document.getElementById('search-wrap').classList.add('hidden');
    document.getElementById('search-input').value='';
    renderCatalog();
  };
  document.getElementById('search-input').addEventListener('input',function(){doSearch(this.value);});

  // Sort
  document.getElementById('sort-sel').addEventListener('change',applyFilter);

  // Back btn
  document.getElementById('back-btn').onclick=()=>goPage(state.prevPage||'home');

  // Modal
  document.getElementById('modal-close').onclick=()=>document.getElementById('modal-bg').classList.add('hidden');
  document.getElementById('modal-bg').onclick=function(e){if(e.target===this)this.classList.add('hidden');};
});
