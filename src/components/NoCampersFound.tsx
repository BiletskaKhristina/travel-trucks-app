import Image from 'next/image';

interface NoCampersFoundProps {
  onClear: () => void;
  onViewAll: () => void;
}

export default function NoCampersFound({ onClear, onViewAll }: NoCampersFoundProps) {
  return (
    <div className="w-[888px] h-[840px] bg-[#F7F7F7] rounded-[16px] flex flex-col items-center pt-[40px] px-[24px]">
      {/* Ілюстрація згідно з ТЗ (488 x 463) */}
      <div className="w-[488px] h-[463px] relative flex justify-center items-center">
        <Image
          src="/empty.png" // Якщо файл лежить прямо в папці public/empty.png
          alt="No campers found illustration"
          width={488}
          height={463}
          priority
        />
      </div>

      {/* Текстовий блок */}
      <div className="w-[840px] text-center mt-[21px]">
        <h2 className="text-[24px] font-semibold leading-[32px] text-[#101828]">
          No campers found
        </h2>
        <p className="text-[16px] font-medium leading-[24px] text-[#101828] mt-[16px]">
          We couldn&apos;t find any campers that match your filters. <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      {/* Ряд кнопок */}
      <div className="flex gap-[16px] mt-[43px]">
        <button
          type="button"
          onClick={onClear}
          className="w-[192px] h-[56px] bg-white border border-[#DADDE1] text-[#101828] font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] flex items-center justify-center gap-[4px] hover:bg-[#F7F7F7] transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Clear filters
        </button>

        <button
          type="button"
          onClick={onViewAll}
          className="w-[192px] h-[56px] bg-[#829B91] text-white font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] flex items-center justify-center hover:opacity-90 transition"
        >
          View all campers
        </button>
      </div>
    </div>
  );
}