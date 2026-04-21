"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth';
import { Package } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuth]);

  if (loading) return <div className="p-8 text-center text-gray-500">Yuklanmoqda...</div>;

  if (!isAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Buyurtmalarni ko'rish uchun kiring</h2>
        <Link href="/login" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold">Tizimga kirish</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <Package size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Hali buyurtmalar yo'q</h2>
        <Link href="/catalog" className="text-yellow-500 font-bold mt-4">Xarid qilishni boshlash</Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'accepted') return 'bg-blue-100 text-blue-800';
    if (status === 'delivered') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-8">Mening buyurtmalarim</h1>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-500">Buyurtma #{o.id}</span>
                <span className="text-xs text-gray-400 ml-2">{new Date(o.created_at).toLocaleDateString()}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(o.status)}`}>
                {o.status.toUpperCase()}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-medium">Manzil:</span> <span className="text-gray-600">{o.address}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-bold">Jami summa:</span>
              <span className="text-xl font-extrabold text-yellow-500">{Number(o.total_price).toLocaleString()} so'm</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
