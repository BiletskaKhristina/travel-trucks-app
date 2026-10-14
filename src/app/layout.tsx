'use client';

import './globals.css';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Створюємо клієнт React Query один раз на рівні додатку
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <QueryClientProvider client={queryClient}>
          {/* Шапка сайту з меню по центру */}
          <header className="border-b border-gray-100 bg-white">
            <div className="container mx-auto px-12 h-20 relative flex items-center justify-between max-w-7xl">
              {/* Логотип зліва */}
              <Link href="/" className="text-xl font-extrabold tracking-tight text-[#101828]">
                TravelTrucks
              </Link>
              
              {/* Навігація по центру */}
              <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm font-medium">
                <Link href="/" className="text-gray-400 hover:text-gray-900 transition font-normal">
                  Home
                </Link>
                <Link href="/catalog" className="text-gray-900 font-semibold transition">
                  Catalog
                </Link>
              </nav>
              
              {/* Пустий блок для симетрії flex */}
              <div className="w-[110px]"></div>
            </div>
          </header>

          {/* Контент сторінок */}
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}