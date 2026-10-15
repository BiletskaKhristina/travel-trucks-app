import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export interface Camper {
  id: string;
  _id?: string; // Додаємо цей рядок сюди
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  gallery: { original: string; thumb: string }[];
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
}
export interface CampersResponse {
  campers: Camper[];
  total: number;
}

export const fetchCampers = async ({
  pageParam = 1,
  filters = {},
}: {
  pageParam?: number;
  filters?: Record<string, string | boolean>;
}): Promise<CampersResponse> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== false && value !== null)
  );

  const response = await api.get('/campers', {
    params: {
      page: pageParam,
      limit: 4,
      ...cleanFilters,
    },
  });

  if (Array.isArray(response.data)) {
    return { campers: response.data, total: response.data.length };
  }

  return {
    campers: response.data.campers || [],
    total: response.data.total || 0,
  };
};

export const fetchCamperById = async (id: string): Promise<Camper> => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};

// POST-запит на створення бронювання
export const createBookingRequest = async (
  camperId: string,
  bookingData: { name: string; email: string; bookingDate: string; comment?: string }
) => {
  const response = await api.post(`/campers/${camperId}/booking-requests`, bookingData);
  return response.data;
};
// Функція для форматування ціни
export const formatPrice = (price: number): string => {
  return `€${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};