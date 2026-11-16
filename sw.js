// Leonida Tracker: keeps the page available offline after the first visit (hosted copy only).
// shortcut: one cache, network first; bump the name (v1 -> v2) if more files are ever added.
const C = 'leonida-tracker-v1';
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.add('./')).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./'))));
});
