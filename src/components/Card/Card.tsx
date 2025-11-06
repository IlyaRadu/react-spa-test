import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './Card.module.css';

interface CardProps {
  id: number;
  title: string;
  image: string;
  text?: string;
  liked?: boolean;
  onDelete?: (id: number) => void;
}

/* Компонент карточки товара */
const Card: React.FC<CardProps> = ({ id, title, image, text, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const likeCard = useStore((s) => s.likeCard);
  const deleteCard = useStore((s) => s.deleteCard);
  const liked = useStore((s) => s.cards.find((c) => c.id === id)?.liked ?? false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  // клика по карточке — перейти на страницу товара
  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  // лайк товара
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likeCard(id);
  };

  // открыть модалку удаления
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmOpen(true);
  };

  // перейти на страницу редактирования, передаём откуда пришли
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-product/${id}`, { state: { from: location.pathname } });
  };

  // подтвердить удаление
  const confirmDelete = () => {
    if (onDelete) {
      onDelete(id);
    } else {
      deleteCard(id);
    }
    setConfirmOpen(false);
  };

  // отмена модалки
  const cancelDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConfirmOpen(false);
  };

  return (
    <div className={styles.card} role="article" onClick={handleCardClick}>
      <div className={styles.image} role="img" aria-label={title}>
        <div
          className={styles.imageInner}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <div className={styles['card-content']}>
        <h3 className={styles.title}>{title}</h3>
        {text && <p className={styles.text}>{text}</p>}
      </div>

      <button
        type="button"
        onClick={handleLike}
        className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
        aria-label="like"
        title={liked ? 'Remove from favorites' : 'Add to favorites'}
      >
        {liked ? '♥' : '♡'}
      </button>

      <div className={styles.actions}>
        <button type="button" onClick={handleEdit} className={styles.actionButton} aria-label="edit">
          Edit
        </button>
        <button type="button" onClick={handleDelete} className={styles.actionButton} aria-label="delete">
          Delete
        </button>
      </div>

      {confirmOpen &&
        createPortal(
          <div className={styles.modalOverlay} onClick={cancelDelete} role="presentation">
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`confirm-title-${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 id={`confirm-title-${id}`}>Confirm delete</h4>
              <p>Are you sure you want to permanently delete this product?</p>
              <div className={styles.modalActions}>
                <button type="button" className={styles.modalBtn} onClick={confirmDelete}>
                  Confirm
                </button>
                <button type="button" className={styles.modalCancel} onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Card;