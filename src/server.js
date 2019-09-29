import path from 'path';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import render from '@/ssr/render';

const app = new Koa();

const main = ctx => {
  const { url, query } = ctx.request;
  ctx.response.body = render({ url, query }, { counter: 99 });
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
