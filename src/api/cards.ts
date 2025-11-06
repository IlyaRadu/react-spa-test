import axios from 'axios';
import { Card } from '../types';

/* Запрос к DummyJSON, возвращает массив продуктов */
const API_URL = 'https://dummyjson.com/products?limit=100';

export const fetchCards = async (): Promise<Card[]> => {
  const res = await axios.get(API_URL);
  const products = Array.isArray(res.data?.products) ? res.data.products : [];
  return products.map((p: any) => ({
    id: Number(p.id),
    title: String(p.title),
    image: String(p.thumbnail ?? (p.images && p.images[0]) ?? ''),
    text: String(p.description ?? ''),
    liked: false,
    source: 'api',
  }));
};