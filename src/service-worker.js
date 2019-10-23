/* global workbox */
if (workbox) {
  // eslint-disable-next-line no-console
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  // eslint-disable-next-line no-console
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({
  prefix: 'ssr-test',
  suffix: 'v1.2.0',
  precache: 'custom-precache-name',
  runtime: 'custom-runtime-name',
});
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest || [], {
  directoryIndex: null, // ssr 应用 sw 不自动匹配到预缓存的 /index.html，而是由服务端渲染
  cleanUrls: false,
});

// 仅适用于 SPA
// workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
//   blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
// });

// 适用于 SSR 的 registerNavigationRoute 规则
workbox.routing.setDefaultHandler(({ url, event }) => {
  // eslint-disable-next-line no-restricted-globals
  const sameOrigin = url.origin === self.location.origin;
  if (sameOrigin && /^\/swagger-stats/.test(url.pathname)) {
    return;
  }
  const isNavigate = event.request.mode === 'navigate';
  const networkFirst = new workbox.strategies.NetworkFirst();
  let response = networkFirst.handle({ event });
  if (sameOrigin && isNavigate && !/\/[^/]+\.[^/]+$/.test(url.pathname)) {
    response = response.catch(() => {
      return new Promise(resolve => {
        const indexHtmlKey = workbox.precaching.getCacheKeyForURL('/index.html');
        caches.open(workbox.core.cacheNames.precache).then(cache => {
          cache.match(indexHtmlKey).then(resolve);
        });
      });
    });
  }
  event.respondWith(response);
});

// 带有 hash 文件名的采用缓存优先
workbox.routing.registerRoute(
  /https?:\/\/image-cdn.xxxx.com/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET',
);

// 普通静态文件先使用缓存在更新内容
workbox.routing.registerRoute(
  /https?:\/\/dummyimage\.com/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET',
);

// 以网络优先缓存动态注入的 appconfig.xxx.js 或 appconfig.js 文件
// 注意： 启用了 Service Worker 并部署之后，再修改 Disconf 配置重新发布不会马上生效
//   （因为 html 被缓存了，引入 appconfig.xxx.js 的地址没有更新）
//
// 解决方案一：需要重新打包生成了新的预缓存文件 hash 校验值部署之后才会更新。
// 解决方案二：修改配置将生成的 appconfig.xxx.js 文件名固定为 appconfig.js，
//           在 Nginx 服务器配置 appconfig.js 文件不被缓存（配置文件名固定之后如果有缓存则不会及时在客户端更新）。
workbox.routing.registerRoute(
  /appconfig\.[\w|-]{0,}\.?js$/,
  new workbox.strategies.NetworkFirst(),
  'GET',
);
