import { useEffect } from 'react';
import { fetchCards } from '../api/cards';
import useStore from '../store/useStore';

/* Хук загрузки данных из API */
const useFetchCards = () => {
  const setCards = useStore((s) => s.setCards);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const existing = useStore.getState().cards;
        if (existing.length > 0) return; // если есть данные — не перезаписывать

        const cards = await fetchCards();
        if (!mounted) return;
        setCards(cards);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch cards', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setCards]);
};

export default useFetchCards;