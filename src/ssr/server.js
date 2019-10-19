import path from 'path';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import swStats from 'swagger-stats';
import e2k from 'express-to-koa';
import pkg from '../../package.json';
import main from './main';

// request https 不检查证书
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = new Koa();

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
