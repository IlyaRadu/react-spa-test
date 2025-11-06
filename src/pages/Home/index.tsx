import React from 'react';
import useFetchCards from '../../hooks/useFetchCards';
import CardList from '../../components/CardList/CardList';
import styles from './Home.module.css';

/* Главная страница: загрузка и список */
const Home: React.FC = () => {
  useFetchCards(); // загружает данные при монтировании

  return (
    <div className={styles.root}>
      <CardList />
    </div>
  );
};

export default Home;