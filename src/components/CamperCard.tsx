'use client';

import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs, FaCaravan } from 'react-icons/fa';
import { Camper } from '@/services/campersApi';

interface CamperCardProps {
  camper: Camper & {
    _id?: string;
    coverImage?: string;
    totalReviews?: number;
  };
}

export default function CamperCard({ camper }: CamperCardProps) {
  if (!camper) return null;

  const camperId = camper.id || camper._id || '';

  // Отримання зображення
  const imageSrc =
    camper.coverImage ||
    (typeof camper.gallery?.[0] === 'string'
      ? camper.gallery[0]
      : camper.gallery?.[0]?.original || camper.gallery?.[0]?.thumb);

  // Форматування локації: "Kyiv, Ukraine"
  const formattedLocation = camper.location
    ? camper.location.split(',').map((s) => s.trim()).reverse().join(', ')
    : 'Kyiv, Ukraine';

  // Ціна без копійок / десяткових знаків
  const formattedPrice = camper.price ? `€${Math.round(camper.price)}` : '€8000';

  return (
    <div className="w-[888px] h-[312px] bg-[#F7F7F7] rounded-[16px] p-[24px] flex gap-[24px]">
      {/* Фото кемпера (219x240) */}
      <div className="w-[219px] h-[240px] flex-shrink-0 relative rounded-[16px] overflow-hidden bg-gray-200">
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

      {/* Інформаційний блок */}
      <div className="w-[524px] h-[264px] flex flex-col justify-between">
        <div>
          {/* Назва та ціна */}
          <div className="flex justify-between items-center mb-[8px]">
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#101828] truncate max-w-[360px]">
              {camper.name || 'Camper'}
            </h2>
            <p className="text-[24px] leading-[32px] font-semibold text-[#101828]">
              {formattedPrice}
            </p>
          </div>

          {/* Рейтинг та локація */}
          <div className="flex items-center gap-[16px] text-[16px] leading-[24px] mb-[24px]">
            <span className="flex items-center gap-[4px] text-[#101828]">
              <FaStar className="text-[#FFC531] text-[16px]" />
              <span className="underline font-normal">
                {camper.rating || 4} ({camper.totalReviews || camper.reviews?.length || 2} Reviews)
              </span>
            </span>
            <span className="flex items-center gap-[4px] text-[#101828]">
              <FaMapMarkerAlt className="text-[16px]" />
              {formattedLocation}
            </span>
          </div>

          {/* Опис */}
          <p className="text-[#475467] text-[16px] leading-[24px] font-normal truncate mb-[24px]">
            {camper.description || 'Embrace simplicity and freedom with our campers...'}
          </p>

          {/* Бейджі характеристик */}
          <div className="flex items-center gap-[8px] mb-[24px]">
            <span className="h-[48px] bg-[#F2F4F7] px-[18px] py-[12px] rounded-[10px] text-[16px] leading-[24px] font-medium text-[#101828] capitalize flex items-center gap-[8px]">
              <FaGasPump className="text-[20px]" />
              {camper.engine || 'Petrol'}
            </span>
            <span className="h-[48px] bg-[#F2F4F7] px-[18px] py-[12px] rounded-[10px] text-[16px] leading-[24px] font-medium text-[#101828] capitalize flex items-center gap-[8px]">
              <FaCogs className="text-[20px]" />
              {camper.transmission || 'Automatic'}
            </span>
            <span className="h-[48px] bg-[#F2F4F7] px-[18px] py-[12px] rounded-[10px] text-[16px] leading-[24px] font-medium text-[#101828] capitalize flex items-center gap-[8px]">
              <FaCaravan className="text-[20px]" />
              {camper.form ? camper.form.replace('_', ' ') : 'Alcove'}
            </span>
          </div>
        </div>

        {/* Кнопка Show More (зелена, згідно з макетом) */}
        <div>
          <Link
            href={`/catalog/${camperId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[173px] h-[56px] bg-[#829B91] hover:bg-[#728B81] text-white font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] transition inline-flex items-center justify-center"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}