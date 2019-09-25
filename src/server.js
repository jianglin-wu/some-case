import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
// import prettier from 'prettier';
import Home from './pages/index.js';

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
  let htmlContent = ReactDOMServer.renderToString(<Home />);
  htmlContent = genHtml(htmlContent);
  // htmlContent = prettier.format(htmlContent, { parser: 'html' });
  ctx.response.body = htmlContent;
};

app.use(route.get('/', main));
app.use(route.get('/status', ctx => {
  ctx.response.body = 'ok!';
}));
app.use(serve(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
