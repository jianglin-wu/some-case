if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// 设置为开发模式
workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({
  prefix: 'workbox-test',
  suffix: 'v3',
  precache: 'custom-precache-name',
  runtime: 'custom-runtime-name'
});


workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /^https:\/\/image-cdn\.hahhub\.com/,
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  /^https:\/\/blog-cdn\.hahhub\.com/,
  new workbox.strategies.StaleWhileRevalidate()
);

// workbox.routing.registerRoute(
//   /\.html$/,
//   new workbox.strategies.NetworkFirst()
// );

workbox.routing.registerRoute(
  /^appconfig\.[a-fA-F0-9]*\.js$/,
  new workbox.strategies.NetworkFirst()
);
