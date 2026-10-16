'use client';

import { useState } from 'react';
import Filters from '@/components/Filters';
import CamperCard from '@/components/CamperCard';
import LoaderModal from '@/components/LoaderModal';
import NoCampersFound from '@/components/NoCampersFound';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers, Camper } from '@/services/campersApi';

export default function CatalogPage() {
  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');

  // Отримання даних з бекенду з пагінацією та фільтрами
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['campers', { location, form, engine, transmission }],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({
        pageParam: pageParam as number,
        filters: {
          location,
          form,
          engine,
          transmission,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const campersList = lastPage?.campers || [];
      return campersList.length === 4 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const campers: Camper[] =
    data?.pages.flatMap((page) => page?.campers || []) || [];

  const handleSearch = () => {
    refetch();
  };

  const handleClear = () => {
    setLocation('');
    setForm('');
    setEngine('');
    setTransmission('');
    refetch();
  };

  return (
    <div className="w-full bg-white min-h-screen pb-[52px] relative">
      {/* Модальний лоадер завантаження поверх каталогу */}
      {isLoading && <LoaderModal />}

      <div className="max-w-[1440px] mx-auto pt-[48px] px-[64px] flex gap-[65px]">
        {/* Ліва панель фільтрів (360px) */}
        <Filters
          location={location}
          setLocation={setLocation}
          form={form}
          setForm={setForm}
          engine={engine}
          setEngine={setEngine}
          transmission={transmission}
          setTransmission={setTransmission}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {/* Список карток (888px) */}
        <main className="w-[888px] flex flex-col gap-[32px]">
          {!isLoading && campers.length > 0 ? (
            campers.map((camper, index) => {
              const camperId = camper?.id || camper?._id || `camper-${index}`;
              return <CamperCard key={camperId} camper={camper} />;
            })
          ) : !isLoading && campers.length === 0 ? (
            <NoCampersFound
              onClear={handleClear}
              onViewAll={handleClear}
            />
          ) : null}

          {/* Кнопка Load more */}
          {hasNextPage && !isLoading && campers.length > 0 && (
            <div className="flex justify-center mt-[8px]">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-[145px] h-[56px] bg-white border border-[#DADDE1] text-[#101828] font-medium text-[16px] leading-[24px] tracking-[-0.5%] rounded-[200px] hover:bg-[#F7F7F7] transition"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}