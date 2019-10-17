import path from 'path';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import swStats from 'swagger-stats';
import e2k from 'express-to-koa';
import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { matchPath } from 'react-router-dom';
import * as history from 'history';
import render from '@/ssr/render';
import routes from '@/pages/routes';
import pkg from '../package.json';
import useModules from '@/models';
import RouteApp from '@/pages';

// request https 不检查证书
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = new Koa();

const main = async ctx => {
  const { url, query } = ctx.request;
  const dvaApp = dva({
    history: history.createBrowserHistory,
    initialState: { counter: 99 },
  });

  dvaApp.use(createLoading());
  useModules(dvaApp);
  dvaApp.router(() => <RouteApp />);

  const App = dvaApp.start();
  const store = dvaApp._store; // eslint-disable-line no-underscore-dangle
  const dataRequirements = routes
    .filter(routeProps => matchPath(url.split('?')[0], routeProps))
    .map(({ component }) => component)
    .filter(comp => comp.getInitialProps)
    .map(comp => comp.getInitialProps(store, ctx));
  await Promise.all(dataRequirements);
  ctx.response.body = render({ url, query }, { store, App });
};

app.use(
  e2k(
    swStats.getMiddleware({
      name: pkg.name,
      version: pkg.version,
    }),
  ),
);

// 监控状态
app.use(
  route.get('/status', ctx => {
    ctx.response.body = 'ok!';
  }),
);

// SSR
app.use(route.get('/', main));

// SPA 静态文件
app.use(serve(path.resolve(__dirname, '../dist')), {
  index: '',
  extensions: ['.js', '.css', '.png', '.jpeg', '.jpg', '.gif', '.html'],
});

// SSR
app.use(route.get('/*', main));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});
