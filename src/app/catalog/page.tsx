'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers, CampersResponse } from '@/services/campersApi';
import CamperCard from '@/components/CamperCard';
import {
  FaMapMarkerAlt,
  FaWind,
  FaTv,
  FaUtensils,
  FaShower,
  FaSnowflake,
} from 'react-icons/fa';

export default function CatalogPage() {
  // Стан для всіх фільтрів (включно з обладнанням)
  const [filters, setFilters] = useState({
    location: '',
    form: '',
    engine: '',
    transmission: '',
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    refrigerator: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Запит кемперів із пагінацією та фільтрами
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<CampersResponse, Error>({
    queryKey: ['campers', appliedFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ pageParam: pageParam as number, filters: appliedFilters }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItemsCount = allPages.reduce(
        (acc, page) => acc + page.campers.length,
        0
      );
      return loadedItemsCount < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Зняття радіо-фільтра повторним кліком
  const handleRadioToggle = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  // Перемикання чекбоксів обладнання
  const handleCheckboxToggle = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    const cleared = {
      location: '',
      form: '',
      engine: '',
      transmission: '',
      AC: false,
      kitchen: false,
      TV: false,
      bathroom: false,
      refrigerator: false,
    };
    setFilters(cleared);
    setAppliedFilters(cleared);
  };

  const allCampers = data?.pages.flatMap((page) => page.campers) || [];

  return (
    <div className="bg-[#FFFFFF] min-h-[calc(100vh-80px)] py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 flex flex-col lg:flex-row items-start gap-12 max-w-[1440px]">
        
        {/* Панель фільтрів ліворуч (360px) */}
        <aside className="w-full lg:w-[360px] bg-[#F7F7F7] p-8 rounded-[20px] flex flex-col justify-between flex-shrink-0">
          <div className="flex flex-col gap-8">
            
            {/* Локація */}
            <div>
              <label className="block text-xs font-medium text-[#6C717B] mb-2">Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-[#101828]" />
                <input
                  type="text"
                  placeholder="City"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full bg-[#FFFFFF] pl-11 pr-4 py-3.5 rounded-[12px] border-none outline-none text-sm text-[#101828] font-medium"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#6C717B] mb-6">Filters</p>

              {/* Обладнання (Vehicle Equipment) */}
              <div className="mb-6 border-b border-[#DADDE1] pb-6">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Vehicle equipment</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  
                  {/* AC */}
                  <button
                    type="button"
                    onClick={() => handleCheckboxToggle('AC')}
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      filters.AC ? 'border-[#829B91] bg-white' : 'border-[#DADDE1] bg-transparent hover:border-[#829B91]'
                    }`}
                  >
                    <FaWind className="text-xl text-[#101828]" />
                    <span className="text-xs font-medium text-[#101828]">AC</span>
                  </button>

                  {/* Kitchen */}
                  <button
                    type="button"
                    onClick={() => handleCheckboxToggle('kitchen')}
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      filters.kitchen ? 'border-[#829B91] bg-white' : 'border-[#DADDE1] bg-transparent hover:border-[#829B91]'
                    }`}
                  >
                    <FaUtensils className="text-xl text-[#101828]" />
                    <span className="text-xs font-medium text-[#101828]">Kitchen</span>
                  </button>

                  {/* TV */}
                  <button
                    type="button"
                    onClick={() => handleCheckboxToggle('TV')}
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      filters.TV ? 'border-[#829B91] bg-white' : 'border-[#DADDE1] bg-transparent hover:border-[#829B91]'
                    }`}
                  >
                    <FaTv className="text-xl text-[#101828]" />
                    <span className="text-xs font-medium text-[#101828]">TV</span>
                  </button>

                  {/* Bathroom */}
                  <button
                    type="button"
                    onClick={() => handleCheckboxToggle('bathroom')}
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      filters.bathroom ? 'border-[#829B91] bg-white' : 'border-[#DADDE1] hover:border-[#829B91]'
                    }`}
                  >
                    <FaShower className="text-xl text-[#101828]" />
                    <span className="text-xs font-medium text-[#101828]">Bathroom</span>
                  </button>

                  {/* Refrigerator */}
                  <button
                    type="button"
                    onClick={() => handleCheckboxToggle('refrigerator')}
                    className={`h-20 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      filters.refrigerator ? 'border-[#829B91] bg-white' : 'border-[#DADDE1] hover:border-[#829B91]'
                    }`}
                  >
                    <FaSnowflake className="text-xl text-[#101828]" />
                    <span className="text-xs font-medium text-[#101828]">Fridge</span>
                  </button>

                </div>
              </div>

              {/* Форма кемпера (Camper Form) */}
              <div className="mb-6 border-b border-[#DADDE1] pb-6">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Camper form</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'alcove', label: 'Alcove' },
                    { id: 'panelTruck', label: 'Panel Van' },
                    { id: 'fullyIntegrated', label: 'Integrated' },
                    { id: 'semiIntegrated', label: 'Semi Integrated' },
                  ].map((type) => {
                    const isChecked = filters.form === type.id;
                    return (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => handleRadioToggle('form', type.id)}
                        className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] text-left group"
                      >
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#829B91] rounded-full"></span>}
                        </span>
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Двигун (Engine) */}
              <div className="mb-6 border-b border-[#DADDE1] pb-6">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Engine</h4>
                <div className="flex flex-col gap-3">
                  {['diesel', 'petrol', 'hybrid', 'electric'].map((eng) => {
                    const isChecked = filters.engine === eng;
                    return (
                      <button
                        type="button"
                        key={eng}
                        onClick={() => handleRadioToggle('engine', eng)}
                        className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] capitalize text-left group"
                      >
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#829B91] rounded-full"></span>}
                        </span>
                        <span>{eng}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Трансмісія (Transmission) */}
              <div className="mb-2">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Transmission</h4>
                <div className="flex flex-col gap-3">
                  {['automatic', 'manual'].map((tr) => {
                    const isChecked = filters.transmission === tr;
                    return (
                      <button
                        type="button"
                        key={tr}
                        onClick={() => handleRadioToggle('transmission', tr)}
                        className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] capitalize text-left group"
                      >
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#829B91] rounded-full"></span>}
                        </span>
                        <span>{tr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Кнопки пошуку та очищення */}
          <div className="flex flex-col gap-3 mt-8">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-[#829B91] hover:bg-[#6D7B75] text-[#FFFFFF] font-medium h-[56px] rounded-[200px] transition text-sm flex items-center justify-center cursor-pointer shadow-sm"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full bg-[#FFFFFF] border border-[#DADDE1] hover:border-gray-400 text-[#101828] font-medium h-[56px] rounded-[200px] transition text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-[#000000] font-bold">✕</span> Clear filters
            </button>
          </div>
        </aside>

        {/* Область результатів праворуч */}
        <main className="flex-1 w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-[#6C717B]">
              <div className="w-10 h-10 border-4 border-[#829B91] border-t-transparent rounded-full animate-spin"></div>
              <p>Loading campers...</p>
            </div>
          ) : isError ? (
            <div className="bg-red-50 border border-red-200 rounded-[16px] p-8 text-center my-8">
              <h3 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h3>
              <p className="text-sm text-gray-600 mb-6">Failed to load campers from the server.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-[#829B91] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#6D7B75] transition"
              >
                Try again
              </button>
            </div>
          ) : allCampers.length === 0 ? (
            <div className="bg-[#F7F7F7] rounded-[16px] w-full min-h-[600px] p-8 text-center flex flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/empty-catalog.png" 
                alt="No campers found" 
                className="w-[320px] max-w-full h-auto mb-8 object-contain"
              />
              <h3 className="text-2xl font-bold mb-3 text-[#101828]">No campers found</h3>
              <p className="text-sm text-[#475467] mb-8 max-w-sm leading-relaxed">
                We couldn&apos;t find any campers that match your filters.<br />
                Try adjusting your search or clearing some filters.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-[#FFFFFF] border border-[#DADDE1] hover:border-gray-400 text-[#101828] px-8 h-[56px] rounded-[200px] text-sm font-medium transition flex items-center gap-2"
                >
                  <span className="text-[#000000] font-bold">✕</span> Clear filters
                </button>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-[#829B91] text-[#FFFFFF] px-8 h-[56px] rounded-[200px] text-sm font-medium hover:bg-[#6D7B75] transition"
                >
                  View all campers
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              {allCampers.map((camper) => (
                <CamperCard key={camper.id || camper._id} camper={camper} />
              ))}
            </div>
          )}

          {/* Кнопка Load More */}
          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-10 border border-[#DADDE1] hover:border-[#829B91] text-[#101828] font-medium min-w-[145px] px-8 h-[56px] rounded-[200px] block mx-auto transition text-sm bg-[#FFFFFF] cursor-pointer disabled:opacity-50"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          )}
        </main>

      </div>
    </div>
  );
}