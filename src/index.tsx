import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);

// basename берём из PUBLIC_URL (CRA) или указываем явно '/react-spa-test'
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL || '/react-spa-test'}>
    <App />
  </BrowserRouter>
);