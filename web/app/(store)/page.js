"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, pRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?limit=12')
        ]);
        setCategories(cRes.data.categories);
        setProducts(pRes.data.products);
      } catch (err) {
        toast.error("Ma'lumotlarni yuklashda xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Yuklanmoqda...</div>;

  return (
    <div className="p-4 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full mb-4 inline-block">Yangi!</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Eng Yaxshi Smartfonlar</h2>
          <p className="text-gray-400 mb-6">3-6-12 oy muddatli to'lov asosi bilan xarid qiling</p>
          <Link href="/catalog" className="bg-white text-black px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-gray-100 transition">
            Katalogni ko'rish
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4">Kategoriyalar</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(c => (
            <Link key={c.id} href={`/catalog?category=${c.slug}`} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-gray-100">
                {c.emoji || '📦'}
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h3 className="text-lg font-bold mb-4">Sizga yoqishi mumkin</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map(p => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition group block">
              <div className="relative aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center">
                {p.images && p.images[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-4xl text-gray-300">📦</span>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition">
                  <Heart size={18} />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-400">{p.category_name}</div>
                <h4 className="font-medium text-sm line-clamp-2 leading-tight h-10">{p.name}</h4>
                <div className="pt-2 flex items-center justify-between">
                  <div className="font-extrabold text-yellow-500">{Number(p.price).toLocaleString()} so'm</div>
                </div>
                <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded inline-block mt-2">
                  oyiga {Math.round(p.price / 12).toLocaleString()} so'm
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
