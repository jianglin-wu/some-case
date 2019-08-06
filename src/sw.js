
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({
  prefix: "workbox-test",
  suffix: "v3",
  precache: "custom-precache-name",
  runtime: "custom-runtime-name"
});
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener("message", event => {
  if (event.data === "skipWaiting") {
    console.log("receive skipWaiting message");
    workbox.core.skipWaiting();
  }
});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("http://psyduck-de-MacBook-Pro.local:8080/index.html"));

workbox.routing.registerRoute(
  /https:\/\/image-cdn.hahhub.com/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  "GET"
);
workbox.routing.registerRoute(
  /https:\/\/blog-cdn.hahhub.com/,
  new workbox.strategies.StaleWhileRevalidate(),
  "GET"
);
workbox.routing.registerRoute(
  /appconfig\.js$/,
  new workbox.strategies.NetworkFirst(),
  "GET"
);
