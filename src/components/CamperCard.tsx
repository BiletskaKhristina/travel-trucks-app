'use client';

import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { Camper } from '@/services/campersApi';
import { useFavorites } from '@/hooks/useFavorites';

interface CamperCardProps {
  camper: Camper & { _id?: string; coverImage?: string };
}

export default function CamperCard({ camper }: CamperCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!camper) return null;

  const camperId = camper.id || camper._id || '';
  const favorite = camperId ? isFavorite(camperId) : false;

  // Беремо посилання на картинку з поля coverImage або з будь-якого іншого можливого місця
  const imageSrc =
    camper.coverImage ||
    (typeof camper.gallery?.[0] === 'string'
      ? camper.gallery[0]
      : camper.gallery?.[0]?.original || camper.gallery?.[0]?.thumb);

  return (
    <div className="border border-[#E4E7EC] rounded-[20px] p-6 flex gap-6 bg-white shadow-sm hover:shadow-md transition">
      {/* Зображення кемпера */}
      <div className="w-[290px] h-[310px] flex-shrink-0 relative rounded-[10px] overflow-hidden bg-gray-100">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={camper.name || 'Camper'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Основний вміст картки */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          {/* Заголовок, Ціна та Сердечко */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-[#101828] truncate max-w-[380px]">
              {camper.name || 'Camper'}
            </h2>
            <div className="flex items-center gap-3">
              {/* Ціна без коми у тисячах */}
              <p className="text-2xl font-bold text-[#101828]">
                {camper.price ? `€${camper.price.toFixed(2)}` : '€0.00'}
              </p>

              {/* Кнопка "Сердечко" */}
              <button
                type="button"
                onClick={() => camperId && toggleFavorite(camperId)}
                className="text-2xl transition hover:scale-110 focus:outline-none p-1 cursor-pointer"
                aria-label="Add to favorites"
              >
                <FaHeart
                  className={
                    favorite
                      ? 'text-[#E44848]'
                      : 'text-[#101828] hover:text-[#E44848] transition-colors'
                  }
                />
              </button>
            </div>
          </div>

          {/* Рейтинг та Локація */}
          <div className="flex items-center gap-4 text-sm text-[#101828] mb-6">
            <span className="flex items-center gap-1 underline">
              <FaStar className="text-[#FFC531]" />
              {camper.rating || 0} ({camper.totalReviews || camper.reviews?.length || 0} Reviews)
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#101828]" />
              {camper.location || ''}
            </span>
          </div>

          {/* Опис */}
          <p className="text-[#475467] text-sm line-clamp-1 mb-6">
            {camper.description || ''}
          </p>

          {/* Категорії / Опції */}
          <div className="flex flex-wrap gap-2 mb-6">
            {camper.transmission && (
              <span className="bg-[#F7F7F7] px-4 py-3 rounded-full text-sm font-medium text-[#101828] capitalize">
                {camper.transmission}
              </span>
            )}
            {camper.engine && (
              <span className="bg-[#F7F7F7] px-4 py-3 rounded-full text-sm font-medium text-[#101828] capitalize">
                {camper.engine}
              </span>
            )}
            {camper.kitchen && (
              <span className="bg-[#F7F7F7] px-4 py-3 rounded-full text-sm font-medium text-[#101828]">
                Kitchen
              </span>
            )}
            {camper.AC && (
              <span className="bg-[#F7F7F7] px-4 py-3 rounded-full text-sm font-medium text-[#101828]">
                AC
              </span>
            )}
          </div>
        </div>

        {/* Кнопка "Show more" через Next.js Link у тій самій вкладці */}
        <div>
          <Link
            href={`/catalog/${camperId}`}
            className="bg-[#E44848] hover:bg-[#D83B3B] text-white font-medium px-10 py-4 rounded-full transition text-sm inline-block text-center shadow-sm"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}