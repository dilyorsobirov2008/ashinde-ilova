"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ShoppingCart, Heart, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Savatga qo'shildi!");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${params.id}`);
        setProduct(res.data.product);
      } catch (err) {
        toast.error("Topilmadi");
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id, router]);

  if (loading) return <div className="p-8 text-center text-gray-500">Yuklanmoqda...</div>;
  if (!product) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto pb-24">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 flex items-center gap-4 border-b">
          <button onClick={() => router.back()} className="p-2 -ml-2"><ChevronLeft /></button>
          <span className="font-bold truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:p-8">
          {/* Images */}
          <div className="aspect-square bg-gray-50 md:rounded-3xl flex items-center justify-center p-8 relative">
            {product.images && product.images[0] ? (
               <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            ) : (
               <span className="text-8xl text-gray-300">📦</span>
            )}
            {product.discount_price && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">Chegirma</span>
            )}
          </div>

          {/* Info */}
          <div className="p-4 md:p-0">
            <div className="text-sm text-yellow-500 font-bold mb-2 uppercase tracking-wide">{product.category_name}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{Number(product.price).toLocaleString()} so'm</div>
              {product.discount_price && (
                <div className="text-gray-400 line-through">{Number(product.discount_price).toLocaleString()} so'm</div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-8">
              {[3, 6, 12].map(m => (
                <div key={m} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">{m} oy</div>
                  <div className="text-sm font-bold">{Math.round(product.price / m).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="font-bold mb-2">Tavsif</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Actions (Desktop) */}
            <div className="hidden md:flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 bg-yellow-400 text-black font-bold py-4 rounded-2xl hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Savatga qo'shish
              </button>
              <button className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition">
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions (Mobile) */}
        <div className="fixed bottom-16 w-full p-4 bg-white border-t border-gray-100 lg:hidden flex gap-3 z-40">
           <button onClick={handleAddToCart} className="flex-1 bg-yellow-400 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20">
             <ShoppingCart size={20} /> Savatga qo'shish
           </button>
           <button className="p-3.5 bg-gray-100 text-gray-600 rounded-xl">
             <Heart size={24} />
           </button>
        </div>

      </div>
    </div>
  );
}
