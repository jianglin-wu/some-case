import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import renderPage from './render-page';

const render = ({ url, query }, { store, App }) => {
  const helmetContext = {};
  const routerContext = {};
  const reactDom = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={routerContext}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const { helmet } = helmetContext;
  const reduxState = store.getState();
  return renderPage(reactDom, reduxState, { isPrettier: !!query.prettier, helmet });
};

export default render;
