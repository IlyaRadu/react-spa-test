import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import useStore from '../../store/useStore';

/* Навбар с поиском и ссылками */
const Navbar: React.FC = () => {
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const setShowFavorites = useStore((s) => s.setShowFavorites);
  const setSourceFilter = useStore((s) => s.setSourceFilter);

  const handleAllProductsClick = () => {
    // очистить все фильтры и поиск
    setSearchQuery('');
    setShowFavorites(false);
    setSourceFilter('all');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/products" className={styles.brand} onClick={handleAllProductsClick}>
          Products
        </Link>

        <input
          className={styles.search}
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search products"
        />

        <div className={styles.links}>
          <Link to="/products" className={styles.link} onClick={handleAllProductsClick}>
            All Products
          </Link>
          <Link to="/create-product" className={styles.link}>Create Product</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;