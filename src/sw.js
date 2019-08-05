importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// 设置为开发模式
workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({
  prefix: 'workbox-test',
  suffix: 'v2',
  precache: 'custom-precache-name',
  runtime: 'custom-runtime-name'
});


workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /^https:\/\/image-cdn\.hahhub\.com/,
  new workbox.strategies.StaleWhileRevalidate()
);
