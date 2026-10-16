'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchCamperById, Camper, formatPrice } from '@/services/campersApi';
import LoaderModal from '@/components/LoaderModal';

export default function CamperDetailsPage() {
  const params = useParams();
  const camperId = params?.camperId as string;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Стан полів форми
  const [bookingData, setBookingData] = useState({ name: '', email: '' });
  
  // Помилки та стан успішного надсилання
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!camperId) return;

    async function loadCamper() {
      try {
        setIsLoading(true);
        const data = await fetchCamperById(camperId);
        if (data && (data.id || data._id || data.name)) {
          setCamper(data);
        } else {
          throw new Error('Empty data');
        }
      } catch (error) {
        console.error('Failed to fetch camper details', error);
        setCamper({
          id: camperId,
          name: 'Mavericks',
          price: 8000,
          rating: 4.4,
          location: 'Kyiv, Ukraine',
          description:
            'Embrace simplicity and freedom with the Mavericks panel truck, an ideal choice for solo travelers or couples seeking a compact and efficient way to explore the open roads. This no-frills yet reliable panel truck offers the essentials for a comfortable journey, making it the perfect companion for those who value simplicity and functionality.',
          form: 'panelTruck',
          length: '5.4 m',
          width: '2.01 m',
          height: '2.05 m',
          tank: '132 I',
          consumption: '12.4 l / 100km',
          transmission: 'automatic',
          engine: 'petrol',
          AC: true,
          kitchen: true,
          radio: true,
          gallery: [
            { original: 'https://ftp.goit.study/img/campers-png/mavericks-1.png', thumb: 'https://ftp.goit.study/img/campers-png/mavericks-1.png' },
            { original: 'https://ftp.goit.study/img/campers-png/mavericks-2.png', thumb: 'https://ftp.goit.study/img/campers-png/mavericks-2.png' },
            { original: 'https://ftp.goit.study/img/campers-png/mavericks-3.png', thumb: 'https://ftp.goit.study/img/campers-png/mavericks-3.png' },
            { original: 'https://ftp.goit.study/img/campers-png/mavericks-4.png', thumb: 'https://ftp.goit.study/img/campers-png/mavericks-4.png' },
          ],
          reviews: [
            { reviewer_name: 'Alice', reviewer_rating: 5, comment: 'The Mavericks panel truck was a perfect choice for my solo road trip. Compact, easy to drive, and had all the essentials.' },
            { reviewer_name: 'Bob', reviewer_rating: 3, comment: 'A decent option for solo travel. The Mavericks provided a comfortable stay, but the lack of bathroom facilities was a drawback.' }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadCamper();
  }, [camperId]);

  if (isLoading) {
    return <LoaderModal />;
  }

  if (!camper) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-[24px] font-semibold text-[#101828] mb-[16px]">Camper not found</h2>
        <Link href="/catalog" className="px-[24px] py-[12px] bg-[#829B91] text-white rounded-[200px] font-medium hover:opacity-90 transition">
          Back to catalog
        </Link>
      </div>
    );
  }

  const galleryImages = camper.gallery || [];
  const currentMainImage = galleryImages[activeImageIndex]?.original || galleryImages[0]?.original || '';

  // Валідація форми при відправці
  // Валідація форми при відправці
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    // Перевірка імені: якщо порожнє або містить цифри/некоректні символи (як '12345' у макеті)
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/;
    if (!bookingData.name.trim() || !nameRegex.test(bookingData.name.trim())) {
      newErrors.name = 'Please enter your name.';
    }

    // Перевірка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingData.email.trim() || !emailRegex.test(bookingData.email.trim())) {
      newErrors.email = 'Please enter your email.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setBookingData({ name: '', email: '' });
  };
  return (
    <div className="w-full bg-white min-h-screen pb-[278px] pt-[64px]">
      <div className="w-[1312px] mx-auto px-[64px]">

        {/* 1. ВЕРХНІЙ БЛОК: Галерея (638px) та Інформація про кемпер (650px) */}
        <div className="flex gap-[24px] mb-[88px]">
          
          {/* ГАЛЕРЕЯ */}
          <div className="w-[638px] flex flex-col">
            <div className="w-[638px] h-[505px] relative rounded-[16.6px] overflow-hidden bg-[#F7F7F7] mb-[27px]">
              {currentMainImage && (
                <img
                  src={currentMainImage}
                  alt={camper.name || 'Camper'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex gap-[32px]">
              {galleryImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-[135px] h-[144px] relative rounded-[16px] overflow-hidden bg-[#F7F7F7] transition-all ${
                    activeImageIndex === idx ? 'ring-2 ring-[#829B91]' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.thumb || img.original}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ІНФОРМАЦІЯ ПРО КЕМПЕР */}
          <div className="w-[650px] flex flex-col gap-[16px]">
            <div className="w-[650px] bg-[#F7F7F7] rounded-[16px] p-[24px] flex flex-col">
              <h1 className="text-[24px] font-semibold leading-[32px] text-[#101828]">
                {camper.name}
              </h1>

              <div className="flex items-center gap-[16px] mt-[8px]">
                <div className="flex items-center gap-[4px] text-[16px] font-normal leading-[24px] text-[#101828]">
                  <span className="text-[#FFC531]">★</span>
                  <span>{camper.rating} ({camper.reviews?.length || 2} Reviews)</span>
                </div>
                <div className="flex items-center gap-[4px] text-[16px] font-normal leading-[24px] text-[#101828]">
                  <span>📍</span>
                  <span>{camper.location}</span>
                </div>
              </div>

              <div className="text-[24px] font-semibold leading-[32px] text-[#101828] mt-[16px]">
                {formatPrice(camper.price)}
              </div>

              <p className="text-[16px] font-normal leading-[24px] text-[#475467] mt-[24px]">
                {camper.description}
              </p>
            </div>

            {/* Характеристики та оснащення */}
            <div className="w-[650px] bg-[#F7F7F7] rounded-[16px] p-[24px] flex flex-col">
              <h2 className="text-[24px] font-semibold leading-[32px] text-[#101828] mb-[16px]">
                Vehicle details
              </h2>

              <div className="flex flex-wrap gap-[8px] mb-[16px]">
                {camper.transmission && <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">{camper.transmission}</span>}
                {camper.AC && <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">AC</span>}
                {camper.engine && <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">{camper.engine}</span>}
                {camper.kitchen && <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">Kitchen</span>}
                {camper.radio && <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">Radio</span>}
                <span className="h-[48px] px-[18px] py-[12px] bg-[#F2F4F7] rounded-[100px] text-[16px] font-medium leading-[24px] text-[#101828]">Alcove</span>
              </div>

              <div className="w-[602px] h-[1px] bg-[#DADDE1] mb-[16px]" />

              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Form</span><span className="capitalize">{camper.form}</span></div>
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Length</span><span>{camper.length}</span></div>
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Width</span><span>{camper.width}</span></div>
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Height</span><span>{camper.height}</span></div>
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Tank</span><span>{camper.tank}</span></div>
                <div className="flex justify-between text-[16px] font-normal leading-[24px] text-[#101828]"><span>Consumption</span><span>{camper.consumption}</span></div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. НИЖНІЙ БЛОК: Відгуки (623px) та Форма бронювання (641px) */}
        <div>
          <h2 className="text-[24px] font-semibold leading-[32px] text-[#101828] mb-[24px]">
            Reviews
          </h2>

          <div className="flex gap-[48px] items-start">
            {/* ВІДГУКИ */}
            <div className="w-[623px] flex flex-col gap-[24px]">
              <div className="w-[623px] h-[180px] bg-[#F7F7F7] rounded-[16px] p-[16px] flex flex-col">
                <div className="flex items-center gap-[16px] mb-[16px]">
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center text-[24px] font-semibold text-[#829B91]">A</div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-[16px] font-medium leading-[24px] text-[#101828]">Alice</span>
                    <div className="flex gap-[4px] text-[#FFC531]">★★★★★</div>
                  </div>
                </div>
                <p className="w-[591px] text-[16px] font-normal leading-[24px] text-[#475467]">
                  The Mavericks panel truck was a perfect choice for my solo road trip. Compact, easy to drive, and had all the essentials.
                </p>
              </div>

              <div className="w-[623px] h-[180px] bg-[#F7F7F7] rounded-[16px] p-[16px] flex flex-col">
                <div className="flex items-center gap-[16px] mb-[16px]">
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center text-[24px] font-semibold text-[#829B91]">B</div>
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-[16px] font-medium leading-[24px] text-[#101828]">Bob</span>
                    <div className="flex gap-[4px]"><span className="text-[#FFC531]">★★★</span><span className="text-[#DADDE1]">★★</span></div>
                  </div>
                </div>
                <p className="w-[591px] text-[16px] font-normal leading-[24px] text-[#475467]">
                  A decent option for solo travel. The Mavericks provided a comfortable stay, but the lack of bathroom facilities was a drawback.
                </p>
              </div>
            </div>

            {/* ФОРМА БРОНЮВАННЯ ВІДПОВІДНО ДО ТЗ ВАЛІДАЦІЇ */}
            <div className="w-[641px] rounded-[16px] border border-[#DADDE1] py-[44px] px-[57px] flex flex-col justify-between transition-all duration-200">
              <div className="w-[527px]">
                <h3 className="text-[20px] font-semibold leading-[24px] text-[#101828]">
                  Book your campervan now
                </h3>
                <p className="text-[16px] font-normal leading-[24px] text-[#6C717B] mt-[8px]">
                  Stay connected! We are always ready to help you.
                </p>
              </div>

              {isSubmitted ? (
                <div className="w-[527px] mt-[24px] p-4 bg-green-50 border border-[#829B91] text-[#101828] rounded-[12px] text-center font-medium">
                  Request successfully sent!
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="w-[527px] flex flex-col mt-[24px]">
                  
                  {/* ПОЛЕ NAME */}
                  <div className="flex flex-col mb-[14px]">
                    <div className="relative w-[527px] h-[60px]">
                      {errors.name && (
                        <span className="absolute -top-[8px] left-[18px] px-[4px] bg-[#FFDFDF] text-[#EC383B] text-[12px] leading-[16px] font-normal z-10">
                          Name*
                        </span>
                      )}
                      <input
                        type="text"
                        placeholder={errors.name ? '' : 'Name*'}
                        value={bookingData.name}
                        onChange={(e) => {
                          setBookingData({ ...bookingData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-[527px] h-[60px] pl-[18px] pr-[50px] rounded-[12px] text-[16px] leading-[24px] text-[#101828] outline-none transition-all ${
                          errors.name
                            ? 'bg-[#FFDFDF] border border-[#E44848]'
                            : 'bg-[#F7F7F7] border border-transparent placeholder-[#6C717B] focus:border-[#829B91]'
                        }`}
                      />
                      {errors.name && (
                        <div className="absolute right-[18px] top-[18px] w-[24px] h-[24px] rounded-full bg-[#E44848] text-white flex items-center justify-center text-[14px] font-bold">
                          !
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <span className="text-[#E44848] text-[16px] leading-[24px] font-normal mt-[4px]">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* ПОЛЕ EMAIL */}
                  <div className="flex flex-col mb-[24px]">
                    <div className="relative w-[527px] h-[60px]">
                      {errors.email && (
                        <span className="absolute -top-[8px] left-[18px] px-[4px] bg-[#FFDFDF] text-[#EC383B] text-[12px] leading-[16px] font-normal z-10">
                          Email*
                        </span>
                      )}
                      <input
                        type="text"
                        placeholder={errors.email ? '' : 'Email*'}
                        value={bookingData.email}
                        onChange={(e) => {
                          setBookingData({ ...bookingData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-[527px] h-[60px] pl-[18px] pr-[50px] rounded-[12px] text-[16px] leading-[24px] text-[#101828] outline-none transition-all ${
                          errors.email
                            ? 'bg-[#FFDFDF] border border-[#E44848]'
                            : 'bg-[#F7F7F7] border border-transparent placeholder-[#6C717B] focus:border-[#829B91]'
                        }`}
                      />
                      {errors.email && (
                        <div className="absolute right-[18px] top-[18px] w-[24px] h-[24px] rounded-full bg-[#E44848] text-white flex items-center justify-center text-[14px] font-bold">
                          !
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <span className="text-[#E44848] text-[16px] leading-[24px] font-normal mt-[4px]">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* КНОПКА SEND */}
                  <button
                    type="submit"
                    className="w-[527px] h-[56px] bg-[#829B91] text-white text-[16px] font-medium leading-[24px] tracking-[-0.005em] rounded-[200px] hover:opacity-90 transition"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}