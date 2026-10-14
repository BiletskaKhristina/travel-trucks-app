'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers, Camper } from '@/services/campersApi';
import { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

export default function CatalogPage() {
  // Початкові фільтри порожні, щоб перший запит був чистим (без 400 Bad Request)
  const [filters, setFilters] = useState({
    location: '',
    form: '',
    engine: '',
    transmission: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    location: '',
    form: '',
    engine: '',
    transmission: '',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['campers', appliedFilters],
    queryFn: ({ pageParam = 1 }) => fetchCampers({ pageParam, filters: appliedFilters }),
    getNextPageParam: (lastPage: unknown, allPages) => {
      const pageData = lastPage as { items?: Camper[] } | Camper[];
      const items = Array.isArray(pageData) ? pageData : pageData?.items || [];
      return items.length === 4 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
    };
    setFilters(cleared);
    setAppliedFilters(cleared);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-[calc(100vh-80px)] py-[120px]">
      <div className="container mx-auto px-16 flex items-start gap-16 max-w-[1440px]">
        
        {/* Панель фільтрів ліворуч (360px, тло #F7F7F7, радіус 20px) */}
        <aside className="w-[360px] bg-[#F7F7F7] p-8 rounded-[20px] flex flex-col justify-between flex-shrink-0">
          <div className="flex flex-col gap-8">
            
            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-[#6C717B] mb-2">Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-[#101828]" />
                <input
                  type="text"
                  placeholder="City"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full bg-[#FFFFFF] pl-11 pr-4 py-3.5 rounded-[12px] border-none outline-none text-sm text-[#101828] font-medium"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#6C717B] mb-6">Filters</p>
              
              {/* Camper form */}
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
                      <label key={type.id} className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] group">
                        <input
                          type="radio"
                          name="form"
                          checked={isChecked}
                          onChange={() => handleFilterChange('form', isChecked ? '' : type.id)}
                          className="peer hidden"
                        />
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#475467] rounded-full"></span>}
                        </span>
                        <span>{type.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Engine */}
              <div className="mb-6 border-b border-[#DADDE1] pb-6">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Engine</h4>
                <div className="flex flex-col gap-3">
                  {['diesel', 'petrol', 'hybrid', 'electric'].map((eng) => {
                    const isChecked = filters.engine === eng;
                    return (
                      <label key={eng} className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] capitalize group">
                        <input
                          type="radio"
                          name="engine"
                          checked={isChecked}
                          onChange={() => handleFilterChange('engine', isChecked ? '' : eng)}
                          className="peer hidden"
                        />
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#475467] rounded-full"></span>}
                        </span>
                        <span>{eng}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Transmission */}
              <div className="mb-2">
                <h4 className="font-semibold text-[#101828] text-base mb-4">Transmission</h4>
                <div className="flex flex-col gap-3">
                  {['automatic', 'manual'].map((tr) => {
                    const isChecked = filters.transmission === tr;
                    return (
                      <label key={tr} className="flex items-center gap-3 cursor-pointer text-sm text-[#101828] capitalize group">
                        <input
                          type="radio"
                          name="transmission"
                          checked={isChecked}
                          onChange={() => handleFilterChange('transmission', isChecked ? '' : tr)}
                          className="peer hidden"
                        />
                        <span className="w-6 h-6 rounded-full border border-[#475467] flex items-center justify-center bg-transparent transition">
                          {isChecked && <span className="w-3.5 h-3.5 bg-[#475467] rounded-full"></span>}
                        </span>
                        <span>{tr}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки сайдбару */}
          <div className="flex flex-col gap-3 mt-8">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-[#829B91] hover:bg-[#6D7B75] text-[#FFFFFF] font-medium h-[56px] rounded-[200px] transition text-sm flex items-center justify-center"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full bg-[#FFFFFF] border border-[#DADDE1] hover:border-gray-400 text-[#101828] font-medium h-[56px] rounded-[200px] transition text-sm flex items-center justify-center gap-2"
            >
              <span className="text-[#000000] font-bold">✕</span> Clear filters
            </button>
          </div>
        </aside>

        {/* Область результатів праворуч */}
        <main className="flex-1">
          {isLoading ? (
            <div className="text-center py-32 text-[#6C717B]">Loading campers...</div>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              {data?.pages.map((page, pageIdx) => {
                const pageData = page as { items?: Camper[] } | Camper[];
                const campersList = Array.isArray(pageData) ? pageData : pageData?.items || [];

                if (campersList.length === 0 && pageIdx === 0) {
                  return (
                    <div 
                      key="empty" 
                      className="bg-[#F7F7F7] rounded-[16px] w-[888px] h-[840px] p-6 text-center flex flex-col items-center justify-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src="/empty-catalog.png" 
                        alt="No campers found" 
                        className="w-[380px] h-auto mb-8 object-contain"
                      />

                      <h3 className="text-2xl font-bold mb-3 text-[#101828]">No campers found</h3>
                      <p className="text-sm text-[#475467] mb-8 max-w-sm leading-relaxed">
                        We couldn&apos;t find any campers that match your filters.<br />
                        Try adjusting your search or clearing some filters.
                      </p>
                      
                      <div className="flex gap-4">
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
                  );
                }

                return campersList.map((camper: Camper) => (
                  <div key={camper.id} className="bg-[#F7F7F7] p-6 rounded-[16px] flex gap-6 hover:border-gray-300 transition w-[888px] h-[312px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={camper.gallery?.[0]?.thumb || ''}
                      alt={camper.name}
                      className="w-[290px] h-[264px] object-cover rounded-[16px]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="text-2xl font-semibold text-[#101828]">{camper.name}</h2>
                          <span className="text-2xl font-semibold text-[#101828]">€{camper.price?.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#101828] mb-6">
                          <span className="flex items-center gap-1 underline cursor-pointer">
                            <FaStar className="text-[#FFC531]" /> {camper.rating} ({camper.reviews?.length || 0} Reviews)
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-[#101828]" /> {camper.location}
                          </span>
                        </div>
                        <p className="text-[#475467] text-sm line-clamp-1 mb-6">{camper.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="bg-[#F2F4F7] px-4 py-2 rounded-[100px] text-sm font-medium text-[#101828]">
                            {camper.engine}
                          </span>
                          <span className="bg-[#F2F4F7] px-4 py-2 rounded-[100px] text-sm font-medium text-[#101828]">
                            {camper.transmission}
                          </span>
                          <span className="bg-[#F2F4F7] px-4 py-2 rounded-[100px] text-sm font-medium text-[#101828]">
                            {camper.form}
                          </span>
                        </div>
                      </div>

                      <div>
                        <Link
                          href={`/catalog/${camper.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-[#829B91] hover:bg-[#6D7B75] text-[#FFFFFF] font-medium w-[166px] h-[56px] rounded-[200px] transition text-sm"
                        >
                          Show more
                        </Link>
                      </div>
                    </div>
                  </div>
                ));
              })}
            </div>
          )}

          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-10 border border-[#DADDE1] hover:border-[#829B91] text-[#101828] font-medium w-[145px] h-[56px] rounded-[200px] block mx-auto transition text-sm bg-[#FFFFFF]"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          )}
        </main>
      </div>
    </div>
  );
}