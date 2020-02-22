'use strict';

const url = window.location.href;
const swLocation = '/nss-chat/sw.js';
window.url_server = 'http://localhost:3000';

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


document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('online', e => {
    handlerMessage(e);
  });


  window.addEventListener('offline', e => {
    var snackbarContainer = document.querySelector('#no-connection-snackbar');
    var data = {
      message: 'Se ha perdido la conexión',
      timeout: 10000,
      actionHandler: handlerMessage,
      actionText: 'Cerrar'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });

  var handlerMessage = function(event) {
    var snackbarContainer = document.querySelector('#no-connection-snackbar');
    snackbarContainer.MaterialSnackbar.cleanup_();
  };
});