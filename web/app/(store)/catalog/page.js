"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Heart, Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category') || '';

  const [activeCat, setActiveCat] = useState(catParam);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cRes, pRes] = await Promise.all([
          api.get('/categories'),
          api.get(`/products?limit=50${activeCat ? `&category=${activeCat}` : ''}`)
        ]);
        setCategories([{slug: '', name: 'Barchasi'}, ...cRes.data.categories]);
        setProducts(pRes.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCat]);

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Filter size={18}/> Kategoriyalar</h3>
          <ul className="space-y-2">
            {categories.map(c => (
              <li key={c.slug}>
                <button 
                  onClick={() => setActiveCat(c.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${activeCat === c.slug ? 'bg-yellow-400 text-black font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Katalog</h1>
          <span className="text-gray-500 text-sm">{products.length} ta mahsulot</span>
        </div>

        {loading ? (
          <div className="text-center p-8 text-gray-500">Yuklanmoqda...</div>
        ) : products.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold mt-4">Mahsulot topilmadi</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition group block">
                <div className="relative aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center p-4">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  ) : (
                    <span className="text-4xl text-gray-300">📦</span>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">{p.category_name}</div>
                  <h4 className="font-medium text-sm line-clamp-2 leading-tight h-10">{p.name}</h4>
                  <div className="pt-2">
                    <div className="font-extrabold text-yellow-500">{Number(p.price).toLocaleString()} so'm</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
