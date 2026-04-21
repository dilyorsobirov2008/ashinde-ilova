"use client";

import { useEffect, useState } from 'react';
import { Home, Search, Heart, ShoppingCart, User as UserIcon, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';

export default function StoreLayout({ children }) {
  const pathname = usePathname();
  const { isAuth, checkAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    checkAuth().finally(() => setMounted(true));
  }, [checkAuth]);

  if (!mounted) return null;

  const navs = [
    { name: 'Asosiy', path: '/', icon: Home },
    { name: 'Katalog', path: '/catalog', icon: Search },
    { name: 'Sevimli', path: '/favorites', icon: Heart },
    { name: 'Savat', path: '/cart', icon: ShoppingCart },
    { name: 'Profil', path: isAuth ? '/profile' : '/login', icon: UserIcon },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2"><Menu /></button>
            <Link href="/" className="text-xl font-extrabold tracking-tight">ashinde<span className="text-yellow-400">.</span></Link>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative w-96">
              <input type="text" placeholder="Mahsulot qidirish..." className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart size={24} />
            </Link>
            {isAuth ? (
               <Link href="/profile" className="hidden lg:flex items-center gap-2 font-medium">Profil</Link>
            ) : (
               <Link href="/login" className="hidden lg:flex px-4 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition">Kirish</Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navs.map(n => {
            const Icon = n.icon;
            const active = pathname === n.path || (pathname.startsWith(n.path) && n.path !== '/');
            return (
              <Link key={n.name} href={n.path} className={`flex flex-col items-center gap-1 w-full py-2 ${active ? 'text-yellow-500' : 'text-gray-500'}`}>
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{n.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  );
}
