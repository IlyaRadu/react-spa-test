import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Card } from '../types';

/* Стор приложения: карточки и простые операции */
type StoreState = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
  likeCard: (id: number) => void;
  deleteCard: (id: number) => void;
  filterFavorites: () => Card[];

  // фильтры в глобальном сторе
  showFavorites: boolean;
  setShowFavorites: (v: boolean) => void;

  sourceFilter: 'all' | 'api' | 'manual';
  setSourceFilter: (v: 'all' | 'api' | 'manual') => void;

  // поиск
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cards: [],
      setCards: (cards: Card[]) => set(() => ({ cards })),
      addCard: (card: Card) =>
        set((state) => ({ cards: [...state.cards, card] })),
      updateCard: (card: Card) =>
        set((state) => ({ cards: state.cards.map((c) => (c.id === card.id ? card : c)) })),
      likeCard: (id: number) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, liked: !c.liked } : c
          ),
        })),
      deleteCard: (id: number) =>
        set((state) => ({ cards: state.cards.filter((c) => c.id !== id) })),
      filterFavorites: () => get().cards.filter((c) => c.liked),

      // фильтры по умолчанию
      showFavorites: false,
      setShowFavorites: (v: boolean) => set(() => ({ showFavorites: v })),

      sourceFilter: 'all',
      setSourceFilter: (v: 'all' | 'api' | 'manual') => set(() => ({ sourceFilter: v })),

      // поиск
      searchQuery: '',
      setSearchQuery: (q: string) => set(() => ({ searchQuery: q })),
    }),
    {
      name: 'react-spa-cards',
      getStorage: () => localStorage,
    }
  )
);

export default useStore;