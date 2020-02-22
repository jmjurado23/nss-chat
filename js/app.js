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

window.onload = (e) => { 
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    document.getElementById('box').style.display = 'block';
    var addBtn = document.getElementById('add-button');

    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      document.getElementById('box').style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });

}