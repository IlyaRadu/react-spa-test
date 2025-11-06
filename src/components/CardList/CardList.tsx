import React, { useMemo, useEffect } from 'react';
import useStore from '../../store/useStore';
import Card from '../Card/Card';
import styles from './CardList.module.css';
import { Card as CardType } from '../../types';

const ITEMS_PER_PAGE = 12;

/* Список карточек с пагинацией и фильтрами */
const CardList: React.FC = () => {
  const pageState = React.useState(1);
  const [page, setPage] = pageState;

  // берем фильтры из стора
  const showFavorites = useStore((s) => s.showFavorites);
  const setShowFavorites = useStore((s) => s.setShowFavorites);
  const sourceFilter = useStore((s) => s.sourceFilter);
  const setSourceFilter = useStore((s) => s.setSourceFilter);

  const cards = useStore((s) => s.cards);
  const filterFavorites = useStore((s) => s.filterFavorites);
  const searchQuery = useStore((s) => s.searchQuery);

  // начальный список (всё или только избранные)
  let sourceList = showFavorites ? filterFavorites() : cards;

  // фильтр по источнику (api/manual)
  if (sourceFilter === 'api') {
    sourceList = sourceList.filter((c) => (c as any).source !== 'manual');
  } else if (sourceFilter === 'manual') {
    sourceList = sourceList.filter((c) => (c as any).source === 'manual');
  }

  // поиск по title и description (в реальном времени)
  const q = (searchQuery || '').trim().toLowerCase();
  if (q) {
    sourceList = sourceList.filter((c) => {
      const title = (c.title || '').toLowerCase();
      const text = (c.text || '').toLowerCase();
      return title.includes(q) || text.includes(q);
    });
  }

  // сбрасываем страницу при смене фильтров/поиска
  useEffect(() => {
    setPage(1);
  }, [showFavorites, sourceFilter, searchQuery, setPage]);

  // подсчёт страниц и выбор текущей страницы
  const totalPages = Math.max(1, Math.ceil(sourceList.length / ITEMS_PER_PAGE));

  const displayedCards = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sourceList.slice(start, start + ITEMS_PER_PAGE);
  }, [sourceList, page]);

  const goToPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));
  const prev = () => goToPage(page - 1);
  const next = () => goToPage(page + 1);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.viewControls}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setShowFavorites(false)}
            disabled={!showFavorites}
          >
            All
          </button>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setShowFavorites(true)}
            disabled={showFavorites}
          >
            Favorites
          </button>
        </div>

        <div className={styles.sourceControls}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setSourceFilter('all')}
            disabled={sourceFilter === 'all'}
          >
            All sources
          </button>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setSourceFilter('api')}
            disabled={sourceFilter === 'api'}
          >
            API
          </button>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setSourceFilter('manual')}
            disabled={sourceFilter === 'manual'}
          >
            Created
          </button>
        </div>
      </div>

      {displayedCards.length === 0 ? (
        <div className={styles.emptyState}>
          {showFavorites ? (
            <p>No favorites yet. Products you mark as favorite will appear here.</p>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      ) : (
        <div className={styles.cardList}>
          {displayedCards.map((card: CardType) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageNav} onClick={prev} disabled={page === 1}>
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            if (Math.abs(p - page) > 3 && p !== 1 && p !== totalPages) return null;
            return (
              <button
                key={p}
                className={`${styles.pageButton} ${p === page ? styles.pageButtonActive : ''}`}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            );
          })}

          <button className={styles.pageNav} onClick={next} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;