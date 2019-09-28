import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import serialize from 'serialize-javascript';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import prettier from 'prettier';
import App from './pages';
import createStore from './store/index';

const usePrettier = false;
const renderPage = (reactDom, reduxState) => {
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>some-case</title>
</head>
<body>
  <div id="root">${reactDom}</div>
  <script>
    window.__PRELOADED_STATE__ = ${serialize(reduxState, { isJSON: true })}
  </script>
  <script src="/index.js"></script>
</body>
</html>
  `.trim();
  if (usePrettier) {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  }
  return htmlContent;
};
const app = new Koa();

const main = ctx => {
  const store = createStore({ counter: 666 });
  const context = {};
  const reactDom = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter location={ctx.request.url} context={context}>
        <App />
      </StaticRouter>
    </ReduxProvider>,
  );
  const reduxState = store.getState();
  ctx.response.body = renderPage(reactDom, reduxState);
};

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
  extensions: ['.js', '.css', '.png', '.jpeg', '.jpg', 'gif'],
});

// SSR
app.use(route.get('/*', main));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});
