// Imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  //'/',
  '/index.html',
  '/css/style.css',
  '/css/GoogleSans-Regular.ttf',
  '/img/favicon.ico',
  '/img/avatars/parrot.gif',
  '/img/avatars/banana.gif',
  '/img/avatars/poop.gif',
  '/js/app.js',
  '/js/app/register.vue',
  '/js/app/chat.vue',
  '/js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://code.getmdl.io/1.3.0/material.pink-light_green.min.css',
  'css/animate.css',
  'js/libs/jquery.js',
  'js/libs/vue.js',
  'js/libs/vue-router.js',
  'js/libs/vue-loader.js',
  'js/libs/material.min.js'
];

self.addEventListener( 'install', e => {

  // Añadir los archivos que necesitamos a la cache
  const cacheStatic = caches.open(STATIC_CACHE).then(cache => 
    cache.addAll(APP_SHELL)
  );
  const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => 
    cache.addAll(APP_SHELL_INMUTABLE)
  );

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

  console.log("Service Worker instalado con éxito!! :)");
});

self.addEventListener('activate', e => {
  const respuesta = caches.keys().then( keys => {
    keys.forEach( key => {
      if( key !== STATIC_CACHE && key.includes('static') ) {
        return caches.delete(key);
      }

      if( key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
        return caches.delete(key);
      }

    });
  });
  console.log("Service Worker activado con éxito!! :)");
});

self.addEventListener('fetch', e => {
  const respuesta = caches.match(e.request).then( res => {
    if (res ) {
      return res;
    } else {
      // Si el archivo no está en caché, se recupera de internet
      return fetch(e.request).then( newRes => {
        return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
      });
    }
  });
  e.respondWith( respuesta );
});