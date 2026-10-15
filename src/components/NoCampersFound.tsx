'use client';

import Image from 'next/image';

interface NoCampersFoundProps {
  onClear: () => void;
  onViewAll: () => void;
}

export default function NoCampersFound({ onClear, onViewAll }: NoCampersFoundProps) {
  return (
    <div className="w-[888px] bg-[#F7F7F7] rounded-[20px] p-[64px] flex flex-col items-center justify-center text-center">
      {/* Ілюстрація з кемпером і горами */}
      <div className="relative w-[280px] h-[200px] mb-[24px]">
        {/* Можна використати власну ілюстрацію або плейсхолдер/іконку */}
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-[12px] text-gray-400 text-sm">
          [Campers Illustration]
        </div>
      </div>

      <h3 className="text-[24px] leading-[32px] font-semibold text-[#101828] mb-[8px]">
        No campers found
      </h3>
      <p className="text-[16px] leading-[24px] text-[#475467] max-w-[400px] mb-[32px]">
        We couldn&apos;t find any campers that match your filters. Try adjusting your search or clearing some filters.
      </p>

      {/* Кнопки керування */}
      <div className="flex items-center gap-[16px]">
        <button
          type="button"
          onClick={onClear}
          className="h-[56px] px-[24px] bg-white border border-[#DADDE1] text-[#101828] font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] hover:bg-gray-50 transition flex items-center justify-center gap-[8px]"
        >
          <span>✕</span> Clear filters
        </button>
        <button
          type="button"
          onClick={onViewAll}
          className="h-[56px] px-[24px] bg-[#829B91] hover:bg-[#728B81] text-white font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] transition"
        >
          View all campers
        </button>
      </div>
    </div>
  );
}