"use client";

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCartStore();
  const { isAuth, user } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    if (!isAuth) {
      toast.error('Buyurtma berish uchun tizimga kiring');
      router.push('/login');
      return;
    }
    if (!address) {
      toast.error('Manzilni kiriting');
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map(i => ({ product_id: i.id, quantity: i.qty, price: i.price }));
      await api.post('/orders', {
        address,
        payment_method: 'cash',
        items: orderItems,
        total_price: cartTotal
      });
      toast.success('Buyurtma qabul qilindi!');
      clearCart();
      router.push('/orders');
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Savat bo'sh</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Lekin bu tuzatish mumkin bo'lgan holat. Mahsulotlarni savatga qo'shing va buyurtma bering!
        </p>
        <Link href="/catalog" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition">
          Xaridni boshlash
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-8">Savatingiz</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                {item.images && item.images[0] ? (
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-xl mix-blend-multiply" />
                ) : (
                  <span className="text-3xl text-gray-300">📦</span>
                )}
              </div>
              <div className="flex-grow min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-1 truncate pr-8">{item.name}</h3>
                  <div className="text-sm text-gray-500">{item.category_name}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-extrabold text-yellow-500">{Number(item.price).toLocaleString()} so'm</div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-black transition">
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-black transition">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">Buyurtma xulosasi</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar</span>
                <span className="font-medium">{cartTotal.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish</span>
                <span className="font-medium text-green-500">Bepul</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold">Jami</span>
                <span className="text-2xl font-extrabold text-yellow-500">{cartTotal.toLocaleString()} so'm</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Manzil</label>
              <textarea 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none resize-none" 
                rows="3" 
                placeholder="Toshkent shahri, Chilonzor tumani..."
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <button 
              onClick={handleCheckout} 
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Kuting...' : 'Buyurtma berish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
