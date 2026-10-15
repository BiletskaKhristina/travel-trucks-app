'use client';

export default function LoaderModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Напівпрозора підкладка каталогу позаду (#DFDFDF з непрозорістю 44%) */}
      <div className="absolute inset-0 bg-[#DFDFDF]/44 backdrop-blur-[1px]" />

      {/* Модальне вікно завантаження (543 x 296 px) */}
      <div className="relative z-10 w-[543px] h-[296px] bg-white rounded-[16px] px-[96px] py-[48px] flex flex-col items-center justify-center shadow-sm">
        {/* Круговий індикатор (спінер) */}
        <div className="w-[72px] h-[72px] relative mb-[32px]">
          <div className="w-full h-full rounded-full border-[6.4px] border-[#F7F7F7] border-t-[#6D7B75] animate-spin" />
        </div>

        {/* Заголовок */}
        <h3 className="text-[24px] leading-[32px] font-semibold text-[#101828] text-center mb-[16px]">
          Loading campers…
        </h3>

        {/* Пояснення */}
        <p className="text-[16px] leading-[24px] font-medium text-[#101828] text-center max-w-[351px]">
          Please wait while we find campers for you.
        </p>
      </div>
    </div>
  );
}