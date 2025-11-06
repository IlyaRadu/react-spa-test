import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './CreateProduct.module.css';
import { Card } from '../../types';

/* Страница создания продукта */
const isValidUrl = (s: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

const CreateProduct: React.FC = () => {
  const addCard = useStore((s) => s.addCard);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!title.trim()) e.title = 'Title is required';
    else if (title.trim().length < 3) e.title = 'Minimum 3 characters';
    if (!image.trim()) e.image = 'Image URL is required';
    else if (!isValidUrl(image.trim())) e.image = 'Invalid URL';
    if (!text.trim()) e.text = 'Description is required';
    else if (text.trim().length < 10) e.text = 'Minimum 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const newCard: Card = {
      id: Date.now(),
      title: title.trim(),
      image: image.trim(),
      text: text.trim(),
      liked: false,
      source: 'manual',
    };
    addCard(newCard);
    navigate('/products');
  };

  return (
    <div className={styles.root}>
      <h1>Create Product</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span className={styles.label}>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Image URL</span>
          <input value={image} onChange={(e) => setImage(e.target.value)} />
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} />
          {errors.text && <div className={styles.error}>{errors.text}</div>}
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>Create</button>
          <button type="button" className={styles.cancel} onClick={() => navigate('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
