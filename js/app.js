'use strict';

const url = window.location.href;
const swLocation = '/nss-chat/sw.js';

if (navigator.serviceWorker ) {
  if ( url.includes('localhost') ) {
    navigator.serviceWorker.register('/sw.js');
  } else {
    navigator.serviceWorker.register(swLocation);
  }
}

// Cargando componentes con vue loader
const Register = httpVueLoader("./js/app/register.vue");
const Chat = httpVueLoader("./js/app/chat.vue");

// Inicialización de Rutas
const routes = [
    { path: '/', component: Register, name: 'register'},
    { path: '/chat', component: Chat, name: 'chat' }
  ]

const router = new VueRouter({
    routes
  })

const app = new Vue({
    router
}).$mount('#app')