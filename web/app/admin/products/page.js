"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ id: null, name: '', price: '', category_id: '', imageFile: null });

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([api.get('/products?limit=100'), api.get('/categories')]);
      setProducts(pRes.data.products);
      setCategories(cRes.data.categories);
    } catch (err) {
      toast.error('Ma\'lumotlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Saqlanmoqda...');
    try {
      let imageUrls = [];
      if (formData.imageFile) {
        const fileData = new FormData();
        fileData.append('image', formData.imageFile);
        const uploadRes = await api.post('/upload', fileData, { headers: { 'Content-Type': 'multipart/form-data' } });
        imageUrls = [uploadRes.data.url];
      }

      const payload = {
        name: formData.name,
        price: Number(formData.price),
        category_id: formData.category_id ? Number(formData.category_id) : null,
      };
      if (imageUrls.length) payload.images = imageUrls;

      if (formData.id) {
        await api.put(`/products/${formData.id}`, payload);
        toast.success('Yangilandi', { id: loadingToast });
      } else {
        await api.post('/products', payload);
        toast.success('Qo\'shildi', { id: loadingToast });
      }
      
      setShowForm(false);
      setFormData({ id: null, name: '', price: '', category_id: '', imageFile: null });
      fetchData();
    } catch (err) {
      toast.error('Xatolik yuz berdi', { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirmoqchimisiz?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('O\'chirildi');
      fetchData();
    } catch (err) {
      toast.error('O\'chirishda xatolik');
    }
  };

  const openEdit = (p) => {
    setFormData({ id: p.id, name: p.name, price: p.price, category_id: p.category_id || '', imageFile: null });
    setShowForm(true);
  };

  if (loading) return <div className="p-8">Yuklanmoqda...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mahsulotlar</h1>
        <button onClick={() => { setShowForm(true); setFormData({ id: null, name: '', price: '', category_id: '', imageFile: null }); }} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={20} /> Yangi Qo'shish
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4">{formData.id ? 'Tahrirlash' : 'Yangi Mahsulot'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nomi</label>
              <input type="text" className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Narxi</label>
              <input type="number" className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Kategoriya</label>
              <select className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>
                <option value="">Tanlang</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rasm (Cloudinary)</label>
              <input type="file" className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg p-2 text-white" onChange={handleFileChange} />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-lg font-medium text-gray-400 hover:text-white">Bekor qilish</button>
              <button type="submit" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold">Saqlash</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1A1A1A] text-gray-400 text-sm">
            <tr>
              <th className="p-4 font-medium">Rasm</th>
              <th className="p-4 font-medium">Nomi</th>
              <th className="p-4 font-medium">Kategoriya</th>
              <th className="p-4 font-medium">Narxi</th>
              <th className="p-4 font-medium text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="p-4">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-[#222]" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#222] flex items-center justify-center text-gray-500"><ImageIcon size={20}/></div>
                  )}
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-400">{p.category_name}</td>
                <td className="p-4 text-yellow-400 font-bold">{Number(p.price).toLocaleString()} so'm</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg ml-2"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
