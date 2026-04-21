const API = 'http://localhost:5000/api';
let token = localStorage.getItem('adminToken');
let categories = [];
let allOrders = [];

// ── UTILS ──────────────────────────────────────────────
function fmt(n){ return Number(n).toLocaleString('uz-UZ') + ' so\'m'; }
function showToast(msg, type='success'){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast';
  t.style.borderColor = type==='error' ? '#EF4444' : '#7C3AED';
  clearTimeout(t._t); t._t = setTimeout(()=>t.classList.add('hidden'), 2800);
}
function apiFetch(path, opts={}){
  return fetch(API + path, {
    headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' },
    ...opts,
    body: opts.body ? (typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body)) : undefined
  }).then(async r => {
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Xato');
    return data;
  });
}
const badgeClass = { pending:'badge-pending', confirmed:'badge-confirmed', delivering:'badge-delivering', delivered:'badge-delivered', cancelled:'badge-cancelled' };
const statusLabels = { pending:'Kutmoqda', confirmed:'Tasdiqlangan', delivering:'Yetkazilmoqda', delivered:'Yetkazildi', cancelled:'Bekor qilindi' };

function openModal(title, html, onSave){
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-bg').classList.remove('hidden');
  if(onSave) document.getElementById('modal-bg')._save = onSave;
}
function closeModal(){ document.getElementById('modal-bg').classList.add('hidden'); }

// ── AUTH ───────────────────────────────────────────────
document.getElementById('login-btn').onclick = async () => {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();
  const err   = document.getElementById('login-error');
  try {
    const data = await apiFetch('/auth/login', { method:'POST', body: JSON.stringify({email, password:pass}) });
    if(data.user.role !== 'admin'){ err.textContent = 'Admin huquqi yo\'q'; err.classList.remove('hidden'); return; }
    token = data.token;
    localStorage.setItem('adminToken', token);
    document.getElementById('admin-name').textContent = data.user.first_name + ' ' + data.user.last_name;
    showLogin(false);
    loadAll();
  } catch(e){ err.textContent = e.message; err.classList.remove('hidden'); }
};

function showLogin(show){
  document.getElementById('login-page').classList.toggle('hidden', !show);
  document.getElementById('dashboard').classList.toggle('hidden', show);
}

document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem('adminToken'); token = null; showLogin(true);
};

document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-bg').onclick = (e) => { if(e.target === e.currentTarget) closeModal(); };

// ── NAVIGATION ─────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.onclick = () => {
    const sec = link.dataset.section;
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.getElementById('section-'+sec).classList.add('active');
    document.getElementById('page-title').textContent = link.textContent.replace(/^.{2}/,'').trim();
    if(sec==='products') loadProducts();
    if(sec==='categories') loadCategories();
    if(sec==='orders') loadOrders();
    if(sec==='banners') loadBanners();
  };
});

// ── LOAD ALL ───────────────────────────────────────────
async function loadAll(){
  try {
    const [pData, oData] = await Promise.all([
      apiFetch('/products?limit=1'),
      apiFetch('/orders/all'),
    ]);
    allOrders = oData.orders;
    document.getElementById('stat-products').textContent = pData.total || 0;
    document.getElementById('stat-orders').textContent   = allOrders.length;
    const revenue = allOrders.filter(o=>o.status==='delivered').reduce((s,o)=>s+Number(o.total_price),0);
    document.getElementById('stat-revenue').textContent  = fmt(revenue);
    // Recent orders
    const recent = allOrders.slice(0,5);
    document.getElementById('recent-orders-list').innerHTML = recent.map(o=>`
      <div class="order-row">
        <div class="order-row-left">
          <span class="order-id">#${o.id}</span>
          <span class="order-customer">${o.first_name||''} ${o.last_name||''} · ${o.phone||o.email||''}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span class="badge ${badgeClass[o.status]}">${statusLabels[o.status]}</span>
          <span class="order-price">${fmt(o.total_price)}</span>
        </div>
      </div>`).join('');
  } catch(e){ console.error(e); }
}

// ── PRODUCTS ───────────────────────────────────────────
async function loadProducts(){
  const search = document.getElementById('prod-search').value;
  try {
    const data = await apiFetch(`/products?limit=50&search=${encodeURIComponent(search)}`);
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = data.products.map(p=>`
      <tr>
        <td><div class="prod-thumb">${p.images?.[0] ? `<img src="${p.images[0]}" style="width:100%;height:100%;border-radius:8px;object-fit:cover"/>` : '📦'}</div></td>
        <td><strong>${p.name}</strong><br><small style="color:#8888A0">${p.brand||''}</small></td>
        <td>
          <strong>${fmt(p.discount_price||p.price)}</strong>
          ${p.discount_price ? `<br><small style="text-decoration:line-through;color:#8888A0">${fmt(p.price)}</small>` : ''}
        </td>
        <td>${p.category_name||'—'}</td>
        <td><span style="color:${p.stock<5?'#EF4444':'#22C55E'}">${p.stock} dona</span></td>
        <td>
          <button class="btn-sm" onclick="editProduct(${p.id})">✏️ Tahrirlash</button>
          <button class="btn-sm danger" onclick="deleteProduct(${p.id})">🗑</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#888;padding:24px">Mahsulot topilmadi</td></tr>';
  } catch(e){ showToast(e.message,'error'); }
}
document.getElementById('prod-search').addEventListener('input', loadProducts);

document.getElementById('add-product-btn').onclick = () => openProductModal(null);

function productModalHTML(p=null){
  const catOpts = categories.map(c=>`<option value="${c.id}" ${p?.category_id==c.id?'selected':''}>${c.emoji||''} ${c.name}</option>`).join('');
  return `
    <div class="form-group"><label>Nomi *</label><input id="p-name" value="${p?.name||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>Narxi (so'm) *</label><input id="p-price" type="number" value="${p?.price||''}"/></div>
      <div class="form-group"><label>Chegirma narxi</label><input id="p-disc" type="number" value="${p?.discount_price||''}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Kategoriya</label><select id="p-cat"><option value="">Tanlang</option>${catOpts}</select></div>
      <div class="form-group"><label>Omborxona</label><input id="p-stock" type="number" value="${p?.stock||0}"/></div>
    </div>
    <div class="form-group"><label>Brand</label><input id="p-brand" value="${p?.brand||''}"/></div>
    <div class="form-group"><label>Tavsif</label><textarea id="p-desc">${p?.description||''}</textarea></div>
    <div class="form-group"><label>Rasm URLlari (har biri yangi qatorda)</label>
      <textarea id="p-images" style="min-height:80px">${(p?.images||[]).join('\n')}</textarea>
    </div>
    <div class="form-group" style="display:flex;align-items:center;gap:10px">
      <input type="checkbox" id="p-featured" ${p?.is_featured?'checked':''} style="width:auto;accent-color:#7C3AED"/>
      <label for="p-featured" style="margin:0">Tavsiya etilgan</label>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Bekor</button>
      <button class="btn-primary" onclick="saveProduct(${p?.id||'null'})">${p ? 'Saqlash' : 'Qo\'shish'}</button>
    </div>`;
}

async function openProductModal(id){
  await loadCategoriesData();
  let p = null;
  if(id){ try { const d = await apiFetch('/products/'+id); p=d.product; } catch(e){} }
  openModal(id ? 'Mahsulot tahrirlash' : 'Yangi mahsulot', productModalHTML(p));
}
window.editProduct = openProductModal;

window.saveProduct = async (id) => {
  const body = {
    name:           document.getElementById('p-name').value.trim(),
    price:          parseFloat(document.getElementById('p-price').value),
    discount_price: document.getElementById('p-disc').value ? parseFloat(document.getElementById('p-disc').value) : null,
    category_id:    document.getElementById('p-cat').value || null,
    stock:          parseInt(document.getElementById('p-stock').value)||0,
    brand:          document.getElementById('p-brand').value.trim()||null,
    description:    document.getElementById('p-desc').value.trim(),
    images:         document.getElementById('p-images').value.split('\n').map(s=>s.trim()).filter(Boolean),
    is_featured:    document.getElementById('p-featured').checked,
  };
  if(!body.name || !body.price){ showToast('Nomi va narxi kerak!','error'); return; }
  try {
    if(id && id !== 'null'){
      await apiFetch('/products/'+id, { method:'PUT', body });
      showToast('✅ Mahsulot yangilandi');
    } else {
      await apiFetch('/products', { method:'POST', body });
      showToast('✅ Mahsulot qo\'shildi');
    }
    closeModal(); loadProducts();
  } catch(e){ showToast(e.message,'error'); }
};

window.deleteProduct = async (id) => {
  if(!confirm('Haqiqatan o\'chirmoqchimisiz?')) return;
  try { await apiFetch('/products/'+id, {method:'DELETE'}); showToast('🗑 O\'chirildi'); loadProducts(); }
  catch(e){ showToast(e.message,'error'); }
};

// ── CATEGORIES ─────────────────────────────────────────
async function loadCategoriesData(){
  try { const d = await apiFetch('/categories'); categories = d.categories; } catch(e){}
}
async function loadCategories(){
  await loadCategoriesData();
  document.getElementById('cats-list').innerHTML = categories.map(c=>`
    <div class="cat-card">
      <div class="cat-emoji">${c.emoji||'📁'}</div>
      <div class="cat-info">
        <div class="cat-name">${c.name}</div>
        <div class="cat-slug">${c.slug}</div>
      </div>
      <div class="cat-actions">
        <button class="btn-sm danger" onclick="deleteCat(${c.id})">🗑</button>
      </div>
    </div>`).join('') || '<p style="color:#888">Kategoriyalar yo\'q</p>';
}
document.getElementById('add-cat-btn').onclick = () => {
  openModal('Kategoriya qo\'shish', `
    <div class="form-group"><label>Nomi *</label><input id="c-name" placeholder="Elektronika"/></div>
    <div class="form-group"><label>Slug *</label><input id="c-slug" placeholder="elektronika"/></div>
    <div class="form-row">
      <div class="form-group"><label>Emoji</label><input id="c-emoji" placeholder="🔌"/></div>
      <div class="form-group"><label>Tartib</label><input id="c-order" type="number" value="0"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Bekor</button>
      <button class="btn-primary" onclick="saveCat()">Qo'shish</button>
    </div>`);
};
window.saveCat = async () => {
  const body = { name:document.getElementById('c-name').value.trim(), slug:document.getElementById('c-slug').value.trim(), emoji:document.getElementById('c-emoji').value.trim(), sort_order:parseInt(document.getElementById('c-order').value)||0 };
  if(!body.name||!body.slug){ showToast('Nomi va slug kerak!','error'); return; }
  try { await apiFetch('/categories',{method:'POST',body}); showToast('✅ Kategoriya qo\'shildi'); closeModal(); loadCategories(); }
  catch(e){ showToast(e.message,'error'); }
};
window.deleteCat = async (id) => {
  if(!confirm('O\'chirishni tasdiqlang')) return;
  try { await apiFetch('/categories/'+id,{method:'DELETE'}); showToast('🗑 O\'chirildi'); loadCategories(); }
  catch(e){ showToast(e.message,'error'); }
};

// ── ORDERS ─────────────────────────────────────────────
async function loadOrders(){
  try {
    const data = await apiFetch('/orders/all');
    allOrders = data.orders;
    renderOrders(allOrders);
  } catch(e){ showToast(e.message,'error'); }
}
function renderOrders(orders){
  document.getElementById('orders-tbody').innerHTML = orders.map(o=>`
    <tr>
      <td><strong style="color:#8B5CF6">#${o.id}</strong></td>
      <td>${o.first_name||''} ${o.last_name||''}<br><small style="color:#888">${o.phone||o.email||''}</small></td>
      <td><strong>${fmt(o.total_price)}</strong></td>
      <td><span class="badge ${badgeClass[o.status]||''}">${statusLabels[o.status]||o.status}</span></td>
      <td>${new Date(o.created_at).toLocaleDateString('uz-UZ')}</td>
      <td>
        <select class="select-input" style="padding:4px 8px;font-size:.8rem" onchange="updateOrderStatus(${o.id},this.value)">
          ${Object.entries(statusLabels).map(([v,l])=>`<option value="${v}" ${o.status===v?'selected':''}>${l}</option>`).join('')}
        </select>
      </td>
    </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#888;padding:24px">Buyurtma yo\'q</td></tr>';
}
document.getElementById('order-status-filter').onchange = function(){
  const v = this.value;
  renderOrders(v ? allOrders.filter(o=>o.status===v) : allOrders);
};
window.updateOrderStatus = async (id, status) => {
  try { await apiFetch(`/orders/${id}/status`,{method:'PUT',body:{status}}); showToast('✅ Status yangilandi'); loadOrders(); }
  catch(e){ showToast(e.message,'error'); }
};

// ── BANNERS ────────────────────────────────────────────
async function loadBanners(){
  try {
    const data = await apiFetch('/banners');
    document.getElementById('banners-grid').innerHTML = data.banners.map(b=>`
      <div class="banner-card">
        <div class="banner-img">${b.image_url ? `<img src="${b.image_url}" style="width:100%;height:100%;object-fit:cover"/>` : '🖼️ Rasm yo\'q'}</div>
        <div class="banner-info">
          <div class="banner-title">${b.title||'Nomsiz banner'}</div>
          <div class="banner-actions">
            <button class="btn-sm danger" onclick="deleteBanner(${b.id})">🗑 O'chirish</button>
          </div>
        </div>
      </div>`).join('') || '<p style="color:#888">Banner yo\'q</p>';
  } catch(e){ showToast(e.message,'error'); }
}
document.getElementById('add-banner-btn').onclick = () => {
  openModal('Banner qo\'shish', `
    <div class="form-group"><label>Sarlavha</label><input id="b-title" placeholder="Katta chegirma!"/></div>
    <div class="form-group"><label>Rasm URL *</label><input id="b-img" placeholder="https://..."/></div>
    <div class="form-row">
      <div class="form-group"><label>Link turi</label>
        <select id="b-ltype"><option value="category">Kategoriya</option><option value="product">Mahsulot</option><option value="url">URL</option></select>
      </div>
      <div class="form-group"><label>Link qiymati</label><input id="b-lval" placeholder="elektronika"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Bekor</button>
      <button class="btn-primary" onclick="saveBanner()">Qo'shish</button>
    </div>`);
};
window.saveBanner = async () => {
  const body = { title:document.getElementById('b-title').value, image_url:document.getElementById('b-img').value.trim(), link_type:document.getElementById('b-ltype').value, link_value:document.getElementById('b-lval').value };
  if(!body.image_url){ showToast('Rasm URL kerak!','error'); return; }
  try { await apiFetch('/banners',{method:'POST',body}); showToast('✅ Banner qo\'shildi'); closeModal(); loadBanners(); }
  catch(e){ showToast(e.message,'error'); }
};
window.deleteBanner = async (id) => {
  if(!confirm('O\'chirishni tasdiqlang')) return;
  try { await apiFetch('/banners/'+id,{method:'DELETE'}); showToast('🗑 O\'chirildi'); loadBanners(); }
  catch(e){ showToast(e.message,'error'); }
};

// ── INIT ───────────────────────────────────────────────
if(token){
  apiFetch('/auth/me').then(d => {
    if(d.user.role !== 'admin'){ localStorage.removeItem('adminToken'); token=null; showLogin(true); return; }
    document.getElementById('admin-name').textContent = d.user.first_name + ' ' + d.user.last_name;
    showLogin(false); loadAll();
  }).catch(() => { showLogin(true); });
} else {
  showLogin(true);
}
