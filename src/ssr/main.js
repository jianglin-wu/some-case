import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { matchPath } from 'react-router-dom';
import * as history from 'history';
import ReactDOMServer from 'react-dom/server';
import routes from '../pages/routes';
import useModules from '../models';
import App from './App';
import renderPage from './render-page';

const main = async ctx => {
  const { url, query } = ctx.request;
  const helmetContext = {};
  const dvaApp = dva({
    history: history.createBrowserHistory,
    initialState: { counter: 99 },
  });

  dvaApp.use(createLoading());
  useModules(dvaApp);
  dvaApp.router(() => <App url={url} helmetContext={helmetContext} />);

  const Main = dvaApp.start();
  const store = dvaApp._store; // eslint-disable-line no-underscore-dangle
  const dataRequirements = routes
    .filter(routeProps => matchPath(url.split('?')[0], routeProps))
    .map(({ component }) => component)
    .filter(comp => comp.getInitialProps)
    .map(comp => comp.getInitialProps(store, ctx));

  await Promise.all(dataRequirements);

  const reactDom = ReactDOMServer.renderToString(<Main />);
  const { helmet } = helmetContext;
  const reduxState = store.getState();
  const html = renderPage(reactDom, reduxState, { isPrettier: !!query.prettier, helmet });
  ctx.response.body = html;
};

export default main;
