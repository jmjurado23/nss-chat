const url = window.location.href;
const swLocation = '/nss-chat/sw.js';

if (navigator.serviceWorker ) {
  console.log(url);
  if ( url.includes('127.0.0.1') ) {
    console.log('Entro!!!!');
    navigator.serviceWorker.register('http://127.0.0.1:8080/sw.js');
  } else {
    navigator.serviceWorker.register(swLocation);
  }
}

import Register from "./app/register.js";
import Chat from "./app/chat.js";

// Inicialización de Rutas
const routes = [
    { path: '/', component: Register },
    { path: '/chat', component: Chat }
  ]

const router = new VueRouter({
    routes
  })

const app = new Vue({
    router
}).$mount('#app')