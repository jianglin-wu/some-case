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

workbox.routing.registerRoute(
  /https?:\/\/image-cdn.hahhub.com/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET',
);
workbox.routing.registerRoute(
  /https?:\/\/blog-cdn.hahhub.com/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET',
);
workbox.routing.registerRoute(
  /https?:\/\/dummyimage\.com/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET',
);
workbox.routing.registerRoute(/appconfig\.js$/, new workbox.strategies.NetworkFirst(), 'GET');
