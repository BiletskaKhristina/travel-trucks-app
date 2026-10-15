'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isCatalog = pathname.startsWith('/catalog');

  return (
    <header className="w-full h-[72px] bg-[#F7F7F7] border-b border-[#F2F4F7] px-[64px] flex items-center justify-between sticky top-0 z-50">
      {/* Двоколірний логотип */}
      <Link href="/" className="flex items-center text-[20px] font-bold tracking-tight">
        <span className="text-[#101828]">Travel</span>
        <span className="text-[#475467]">Trucks</span>
      </Link>

      {/* Меню навігації по центру */}
      <nav className="flex items-center gap-[32px] mx-auto">
        <Link
          href="/"
          className={`text-[16px] leading-[24px] font-medium transition-colors ${
            isHome ? 'text-[#829B91]' : 'text-[#101828] hover:text-[#829B91]'
          }`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`text-[16px] leading-[24px] font-medium transition-colors ${
            isCatalog ? 'text-[#829B91]' : 'text-[#101828] hover:text-[#829B91]'
          }`}
        >
          Catalog
        </Link>
      </nav>

      {/* Порожній блок праворуч для ідеального центрування меню */}
      <div className="w-[136px]" />
    </header>
  );
}