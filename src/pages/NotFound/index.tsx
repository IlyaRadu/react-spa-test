import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

/* Страница 404 */
const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>404 — Not Found</h1>
      <p>Страница не найдена.</p>
      <Link to="/products">Вернуться к списку</Link>
    </div>
  );
};

export default NotFound;