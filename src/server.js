import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import prettier from 'prettier';
import Home from './pages/index.js';

const usePrettier = false;
const app = new Koa();
const genHtml = contentStr => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>some-case</title>
  </head>
  <body>
    <div id="root">${contentStr}</div>
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
`.trim();
};

const main = ctx => {
  console.log(ctx.request.url);
  let htmlContent = ReactDOMServer.renderToString(<Home />);
  htmlContent = genHtml(htmlContent);
  if (usePrettier) {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  }
  ctx.response.body = htmlContent;
};

// 监控状态
app.use(
  route.get('/status', ctx => {
    ctx.response.body = 'ok!';
  }),
);

// SPA 静态文件
app.use(serve(path.resolve(__dirname, '../dist')), {
  extensions: ['.js', '.css', '.png', '.jpeg', '.jpg', 'gif'],
});

// SSR
app.use(route.get('/*', main));

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
