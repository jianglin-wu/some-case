import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { hot } from 'react-hot-loader/root';
import routes, { getRoutes } from '@/pages/routes';
import '@/pages/index.css';

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>{getRoutes(routes)}</BrowserRouter>
    </HelmetProvider>
  );
};

export default hot(App);
