import Vue from 'vue';

const url = window.location.href;
const swLocation = '/nss-chat/sw.js';

if (navigator.serviceWorker ) {
  if ( url.includes('localhost') ) {
    navigator.serviceWorker.register('/sw.js');
  }

  navigator.serviceWorker.register(swLocation);

}

import Register from "app/register.js";
import Chat from "app/chat.js";

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