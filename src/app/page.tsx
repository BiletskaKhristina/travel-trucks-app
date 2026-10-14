import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center bg-gray-900 px-16 py-20 overflow-hidden">
      {/* Фонове зображення з правильною яскравістю */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      ></div>
      
      {/* Легке затемнення для збереження кольорів за заходу сонця */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Контент */}
      <div className="relative z-20 max-w-xl text-white flex flex-col items-start gap-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Campers of your dreams
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-normal">
          You can find everything you want in our catalog of campers.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-[#829B91] hover:bg-[#6D7B75] text-white font-medium px-8 py-4 rounded-full transition duration-300 text-base shadow-lg"
        >
          View Now
        </Link>
      </div>
    </div>
  );
}