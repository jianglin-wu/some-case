import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import renderPage from './render-page';
import App from '@/pages';
import createStore from '@/store';

const render = ({ url, query }, initialStore = {}) => {
  const store = createStore(initialStore);
  const context = {};
  const reactDom = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </ReduxProvider>,
  );
  const reduxState = store.getState();
  return renderPage(reactDom, reduxState, { isPrettier: !!query.prettier });
};

export default render;
