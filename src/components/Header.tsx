import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-white py-4 px-8 md:px-16 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link href="/" className="text-2xl font-bold text-gray-950 tracking-tight">
        Travel<span className="text-red-500">Trucks</span>
      </Link>
      <nav className="flex gap-8 font-semibold text-gray-700">
        <Link href="/" className="hover:text-red-500 transition-colors">
          Home
        </Link>
        <Link href="/catalog" className="hover:text-red-500 transition-colors">
          Catalog
        </Link>
      </nav>
    </header>
  );
}