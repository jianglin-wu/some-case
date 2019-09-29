import path from 'path';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import { matchPath } from 'react-router-dom';
import render from '@/ssr/render';
import createStore from '@/store';
import routes from '@/pages/routes';

// request https 不检查证书
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = new Koa();

const main = async ctx => {
  const { url, query } = ctx.request;
  const store = createStore({ counter: 99 });
  const dataRequirements = routes
    .filter(routeProps => matchPath(url.split('?')[0], routeProps))
    .map(({ component }) => component)
    .filter(comp => comp.getInitialProps)
    .map(comp => comp.getInitialProps(store, ctx));
  await Promise.all(dataRequirements);
  ctx.response.body = render({ url, query }, store);
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
