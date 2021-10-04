const cacheName = "flutter-app-cache-v1";
 const assetsToCache = [
   "/",
   "/index.html",
   "/icons/android-icon-36x36.png",
   "/icons/android-icon-48x48.png",
   "/icons/android-icon-72x72.png",
   "/icons/android-icon-96x96.png",
   "/icons/android-icon-144x144.png",
   "/icons/android-icon-192x192.png",
   "/icons/apple-icon.png",
   "/icons/apple-icon-57x57.png",
   "/icons/apple-icon-60x60.png",
   "/icons/apple-icon-72x72.png",
   "/icons/apple-icon-76x76.png",
   "/icons/apple-icon-114x114.png",
   "/icons/apple-icon-120x120.png",
   "/icons/apple-icon-144x144.png",
   "/icons/apple-icon-152x152.png",
   "/icons/apple-icon-180x180.png",
   "/icons/apple-icon-precomposed.png",
   "/icons/favicon.ico",
   "/icons/favicon-16x16.png",
   "/icons/favicon-32x32.png",
   "/icons/favicon-96x96.png",
   "/icons/maskable-icon.png",
   "/icons/maskable-icon_x48.png",
   "/icons/maskable-icon_x72.png",
   "/icons/maskable-icon_x96.png",
   "/icons/maskable-icon_x128.png",
   "/icons/maskable-icon_x384.png",
   "/icons/maskable-icon_x512.png",
   "/icons/ms-icon-70x70.png",
   "/icons/ms-icon-144x144.png",
   "/icons/ms-icon-150x150.png",
   "/icons/ms-icon-310x310.png"
 ];

 self.addEventListener("install", (event) => {
    console.log("install event triggered.");
   self.skipWaiting();
   event.waitUntil(
     caches.open(cacheName).then((cache) => {
       return cache.addAll(assetsToCache);
     })
   );
 });

 self.addEventListener( "activate", event => {
     console.log('WORKER: activate event in progress.');
 });


 self.addEventListener("fetch", function (event) {
   event.respondWith(
     caches.match(event.request, {ignoreSearch: true}).then(function (response) {
       // Cache hit - return response
       if (response) {
         return response;
       }
       return fetch(event.request).then (response => {
       const copy = response.clone();
       event.waitUntil(
       caches.open(cacheName).then(cache=> {
       return cache.put(event.request, response);
       });
       );
       return response;
       });
     })
   );
 });
