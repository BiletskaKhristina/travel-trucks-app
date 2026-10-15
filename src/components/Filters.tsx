'use client';

import { HiOutlineMap } from 'react-icons/hi';

interface FiltersProps {
  location: string;
  setLocation: (val: string) => void;
  form: string;
  setForm: (val: string) => void;
  engine: string;
  setEngine: (val: string) => void;
  transmission: string;
  setTransmission: (val: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export default function Filters({
  location,
  setLocation,
  form,
  setForm,
  engine,
  setEngine,
  transmission,
  setTransmission,
  onSearch,
  onClear,
}: FiltersProps) {
  return (
    <aside className="w-[360px] h-[840px] bg-[#F7F7F7] p-[24px] rounded-[20px] flex flex-col justify-between">
      <div>
        {/* Location */}
        <div className="mb-[40px]">
          <label className="block text-[16px] leading-[24px] font-normal text-[#6C717B] mb-[8px]">
            Location
          </label>
          <div className="relative w-[312px] h-[56px]">
            <HiOutlineMap className="absolute left-[20px] top-[18px] text-[#101828] text-[20px]" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kyiv"
              className="w-full h-full bg-white rounded-[12px] pl-[48px] pr-[16px] text-[16px] leading-[24px] text-[#101828] focus:outline-none"
            />
          </div>
        </div>

        {/* Заголовок Filters */}
        <h3 className="text-[20px] leading-[24px] font-semibold text-[#101828] mb-[24px]">
          Filters
        </h3>

        {/* Camper form */}
        <div className="mb-[24px]">
          <h4 className="text-[16px] leading-[24px] font-normal text-[#6C717B] mb-[8px]">
            Camper form
          </h4>
          <div className="flex flex-col gap-[8px]">
            {[
              { id: 'alcove', label: 'Alcove' },
              { id: 'panelTruck', label: 'Panel Van' },
              { id: 'fullyIntegrated', label: 'Integrated' },
              { id: 'semiIntegrated', label: 'Semi Integrated' },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-[8px] cursor-pointer text-[16px] leading-[24px] font-normal text-[#101828]"
              >
                <input
                  type="radio"
                  name="camperForm"
                  checked={form === item.id}
                  onChange={() => setForm(item.id)}
                  className="w-[24px] h-[24px] accent-[#475467]"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div className="mb-[24px]">
          <h4 className="text-[16px] leading-[24px] font-normal text-[#6C717B] mb-[8px]">
            Engine
          </h4>
          <div className="flex flex-col gap-[8px]">
            {[
              { id: 'diesel', label: 'Diesel' },
              { id: 'petrol', label: 'Petrol' },
              { id: 'hybrid', label: 'Hybrid' },
              { id: 'electric', label: 'Electric' },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-[8px] cursor-pointer text-[16px] leading-[24px] font-normal text-[#101828]"
              >
                <input
                  type="radio"
                  name="engine"
                  checked={engine === item.id}
                  onChange={() => setEngine(item.id)}
                  className="w-[24px] h-[24px] accent-[#475467]"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className="mb-[48px]">
          <h4 className="text-[16px] leading-[24px] font-normal text-[#6C717B] mb-[8px]">
            Transmission
          </h4>
          <div className="flex flex-col gap-[8px]">
            {[
              { id: 'automatic', label: 'Automatic' },
              { id: 'manual', label: 'Manual' },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-[8px] cursor-pointer text-[16px] leading-[24px] font-normal text-[#101828]"
              >
                <input
                  type="radio"
                  name="transmission"
                  checked={transmission === item.id}
                  onChange={() => setTransmission(item.id)}
                  className="w-[24px] h-[24px] accent-[#475467]"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопки Search та Clear filters */}
      <div className="flex flex-col gap-[16px]">
        <button
          type="button"
          onClick={onSearch}
          className="w-[312px] h-[56px] bg-[#829B91] hover:bg-[#728B81] text-white font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onClear}
          className="w-[312px] h-[56px] bg-white border border-[#DADDE1] text-[#101828] font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] hover:bg-gray-50 transition flex items-center justify-center gap-[4px]"
        >
          <span className="text-[18px]">✕</span> Clear filters
        </button>
      </div>
    </aside>
  );
}