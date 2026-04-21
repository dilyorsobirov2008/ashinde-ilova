"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, newOrders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We will simulate stats until we create a dedicated /api/stats route
    const fetchStats = async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders') // Assuming we have or will have this route returning all orders
        ]);
        
        const orders = ordRes.data.orders || [];
        const revenue = orders.reduce((sum, o) => sum + Number(o.total_price), 0);
        const newOrders = orders.filter(o => o.status === 'pending').length;

        setStats({
          products: prodRes.data.total || 0,
          orders: orders.length,
          newOrders,
          revenue
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Mahsulotlar', value: stats.products, icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Barcha Buyurtmalar', value: stats.orders, icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Yangi Buyurtmalar', value: stats.newOrders, icon: Users, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { title: 'Jami Daromad', value: stats.revenue.toLocaleString() + " so'm", icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-[#111] border border-[#222] p-6 rounded-2xl flex items-center gap-4">
                <div className={`p-4 rounded-xl ${c.bg} ${c.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-1">{c.title}</div>
                  <div className="text-2xl font-bold">{c.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
