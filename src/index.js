import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainLayout } from './components/Layouts/MainLayout';
import App from './App';

import './styles/base/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainLayout>
      <App />
    </MainLayout>
  </React.StrictMode>
);
