import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './CardDetail.module.css';

/* Страница товара: показать детально и кнопка редактирования */
const CardDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const cards = useStore((s) => s.cards);
  const navigate = useNavigate();
  const location = useLocation();

  const idNum = id ? Number(id) : NaN;
  if (!id || Number.isNaN(idNum)) {
    return <div className={styles.root}>Invalid product id</div>;
  }

  const product = cards.find((c) => c.id === idNum);
  if (!product) {
    return <div className={styles.root}>Product not found</div>;
  }

  // открыть редактор, передаём откуда пришли
  const handleEditTop = () => {
    navigate(`/edit-product/${product.id}`, { state: { from: location.pathname } });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <Link to="/products" className={styles.back}>← Back</Link>
        <button className={styles.editTop} onClick={handleEditTop}>Edit</button>
      </div>

      <section className={styles.detail}>
        <div className={styles.media}>
          <div
            className={styles.image}
            role="img"
            aria-label={product.title}
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.text}</p>
        </div>
      </section>
    </div>
  );
};

export default CardDetail;