import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export interface Camper {
  id: string;
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

export const fetchCampers = async ({
  pageParam = 1,
  filters = {},
}: {
  pageParam?: number;
  filters?: Record<string, string | boolean>;
}) => {
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

  
  return Array.isArray(response.data) ? response.data : response.data.items || [];
};

export const fetchCamperById = async (id: string) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};