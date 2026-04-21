"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { LayoutDashboard, ShoppingBag, Tags, ShoppingCart, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { user, isAuth, loading, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    checkAuth().finally(() => setMounted(true));
  }, [checkAuth]);

  useEffect(() => {
    if (mounted && (!isAuth || user?.role !== 'admin')) {
      router.push('/login');
    }
  }, [mounted, isAuth, user, router]);

  if (!mounted || loading || !isAuth || user?.role !== 'admin') {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Yuklanmoqda...</div>;
  }

  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Mahsulotlar', icon: ShoppingBag, path: '/admin/products' },
    { name: 'Kategoriyalar', icon: Tags, path: '/admin/categories' },
    { name: 'Buyurtmalar', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Mijozlar', icon: Users, path: '/admin/users' },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-[#222] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight">ashinde<span className="text-yellow-400">.</span> admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menu.map(m => {
            const Icon = m.icon;
            const active = pathname === m.path;
            return (
              <Link key={m.path} href={m.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active ? 'bg-yellow-400/10 text-yellow-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Icon size={20} />
                <span className="font-medium">{m.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-[#222]">
          <button onClick={() => { logout(); router.push('/login'); }} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl w-full transition">
            <LogOut size={20} />
            <span className="font-medium">Chiqish</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
