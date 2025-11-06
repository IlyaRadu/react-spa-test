export type Card = {
  id: number;
  title: string;
  image: string;
  text?: string;
  liked?: boolean;
  source?: 'api' | 'manual'; 
};