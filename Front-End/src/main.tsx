// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Mantenha seus estilos globais
import { BrowserRouter } from 'react-router-dom'; // 1. IMPORTAR BROWSERROUTER

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. ENCAPSULAR APP COM O ROTEADOR */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);