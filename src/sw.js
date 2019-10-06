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
  prefix: 'workbox-test2',
  suffix: 'v3.1.1',
  precache: 'custom-precache-name',
  runtime: 'custom-runtime-name',
});
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
//   blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
// });

workbox.routing.registerRoute(
  ({ url }) => {
    console.log('sw args:', url.toString(), self);
    return false;
  },
  // /^((?!\.).)*$/,
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET',
);
workbox.routing.registerRoute(
  /(\.html|\/)$/,
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET',
);
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
