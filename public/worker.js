var cacheName = 'v1:static';
const serveraddress = self.location.origin;


// during the install phase you usually want to cache static assets
self.addEventListener('install', async function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then( async function(cache) {            
        var res = await fetch(serveraddress + '/api/filesToCache');
        console.log("fetching");
        var filelist = await res.json();
            return cache.addAll(filelist).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function(event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});