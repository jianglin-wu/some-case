import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import renderPage from './render-page';
import App from '@/pages';

const render = ({ url, query }, store) => {
  const helmetContext = {};
  const routerContext = {};
  const reactDom = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <ReduxProvider store={store}>
        <StaticRouter location={url} context={routerContext}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    </HelmetProvider>,
  );
  const { helmet } = helmetContext;
  const reduxState = store.getState();
  return renderPage(reactDom, reduxState, { isPrettier: !!query.prettier, helmet });
};

export default render;
