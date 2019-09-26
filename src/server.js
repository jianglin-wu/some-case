import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import prettier from 'prettier';
import App from './pages';

const usePrettier = false;
const app = new Koa();

const main = ctx => {
  const context = {};
  let jsx = ReactDOMServer.renderToString(
    <StaticRouter location={ctx.request.url} context={context}>
      <App />
    </StaticRouter>,
  );
  ctx.response.body = renderPage(jsx);
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
  console.log('http://localhost:3000');
});

function renderPage(reactDom, reduxState, helmetData) {
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>some-case</title>
</head>
<body>
  <div id="root">${reactDom}</div>
  <script src="/index.js"></script>
</body>
</html>
  `.trim();

  if (usePrettier) {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  }

  return htmlContent;
}
