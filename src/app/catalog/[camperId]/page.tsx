'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCamperById } from '@/services/campersApi';
import { FaStar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function CamperDetailsPage() {
  const params = useParams();
  const camperId = params?.camperId as string;

  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
  
  // Поля форми бронювання
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [isBooked, setIsBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Запит детальної інформації про кемпер
  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchCamperById(camperId),
    enabled: !!camperId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.bookingDate) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    // Імітація успішного надсилання та бронювання (або запит на бекенд)
    setIsBooked(true);
  };

  if (isLoading) {
    return <div className="text-center py-32 text-gray-500">Loading camper details...</div>;
  }

  if (isError || !camper) {
    return <div className="text-center py-32 text-red-500">Failed to load camper details.</div>;
  }

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] py-12">
      <div className="container mx-auto px-12 max-w-7xl">
        {/* Заголовок та основна інформація */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#101828] mb-2">{camper.name}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1 underline">
              <FaStar className="text-[#FFC531]" /> {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400" /> {camper.location}
            </span>
          </div>
          <p className="text-3xl font-bold text-[#101828]">€{camper.price?.toFixed(2)}</p>
        </div>

        {/* Галерея зображень */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {camper.gallery?.map((img: any, index: number) => (
            <img
              key={index}
              src={img.original || img.thumb}
              alt={`${camper.name} ${index + 1}`}
              className="w-full h-72 object-cover rounded-2xl shadow-sm"
            />
          ))}
        </div>

        {/* Опис */}
        <p className="text-gray-600 mb-10 max-w-4xl text-base">{camper.description}</p>

        {/* Таби: Features / Reviews */}
        <div className="flex border-b border-gray-200 mb-10 gap-8">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-4 text-lg font-semibold transition border-b-2 ${
              activeTab === 'features' ? 'border-[#101828] text-[#101828]' : 'border-transparent text-gray-400'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-lg font-semibold transition border-b-2 ${
              activeTab === 'reviews' ? 'border-[#101828] text-[#101828]' : 'border-transparent text-gray-400'
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Контент табів і форма бронювання в дві колонки */}
        <div className="flex gap-24 items-start">
          <div className="w-1/2">
            {activeTab === 'features' ? (
              <div className="bg-[#F7F7F7] p-8 rounded-2xl">
                <div className="flex flex-wrap gap-3 mb-8">
                  {/* Беджи характеристик */}
                  <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] capitalize">
                    {camper.transmission}
                  </span>
                  <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] capitalize">
                    {camper.engine}
                  </span>
                  {camper.AC && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828]">AC</span>}
                  {camper.kitchen && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828]">Kitchen</span>}
                  {camper.TV && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828]">TV</span>}
                  {camper.bathroom && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828]">Bathroom</span>}
                </div>

                <h3 className="text-xl font-semibold text-[#101828] mb-6 border-b border-gray-200 pb-4">Vehicle details</h3>
                <div className="flex flex-col gap-4 text-sm font-medium text-[#101828]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Form</span>
                    <span className="capitalize">{camper.form}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Length</span>
                    <span>{camper.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Width</span>
                    <span>{camper.width}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Height</span>
                    <span>{camper.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tank</span>
                    <span>{camper.tank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Consumption</span>
                    <span>{camper.consumption}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {camper.reviews && camper.reviews.length > 0 ? (
                  camper.reviews.map((review: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-[#F2F4F7] rounded-full flex items-center justify-center font-bold text-[#829B91] text-lg">
                          {review.reviewer_name?.[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#101828]">{review.reviewer_name}</h4>
                          <div className="flex gap-1 text-sm">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={star <= review.reviewer_rating ? 'text-[#FFC531]' : 'text-gray-200'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Форма бронювання */}
          <div className="w-1/2 border border-gray-200 p-8 rounded-2xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-[#101828] mb-2">Book your camper now</h3>
            <p className="text-gray-500 text-sm mb-6">Stay connected! We are always ready to help you.</p>

            {isBooked ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl flex items-center gap-3 text-green-700">
                <FaCheckCircle className="text-2xl" />
                <div>
                  <p className="font-semibold">Booking successful!</p>
                  <p className="text-sm">We will contact you shortly to confirm details.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F7F7] px-4 py-3 rounded-xl border border-transparent outline-none focus:border-[#829B91] text-sm text-[#101828]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F7F7] px-4 py-3 rounded-xl border border-transparent outline-none focus:border-[#829B91] text-sm text-[#101828]"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F7F7] px-4 py-3 rounded-xl border border-transparent outline-none focus:border-[#829B91] text-sm text-gray-500"
                  />
                </div>
                <div>
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F7F7] px-4 py-3 rounded-xl border border-transparent outline-none focus:border-[#829B91] text-sm text-[#101828] resize-none"
                  ></textarea>
                </div>

                {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

                <button
                  type="submit"
                  className="mt-2 bg-[#829B91] hover:bg-[#6D7B75] text-white font-medium py-3.5 rounded-full transition text-sm shadow-sm"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}