<template>
  <div class="mdl-layout__container">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">
          {{'NSS Chat  -  ' + getName()}}
        </span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" @click="exit()">Cerrar</a>
        </nav>
      </div>
      </header>
    </div>
    <div class="inner" id="message-content" >
      <!-- Messages -->
      <div class="content">
        <div class="message-wrapper" v-for="(mes, i) in messages" v-bind:key="`${i}`">
            <div class="circle-wrapper">
              <img :src="urlForImage(mes.user_avatar)">
            </div>
            <div class="text-wrapper">
              {{mes.data}}
            </div>
        </div>
      </div>
    </div>
    <footer class="mdl-mini-footer">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--3-col-phone">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="name" v-model="message">
            <label class="mdl-textfield__label" for="message">Escribe un mensaje</label>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">send</i>
          </button>
        </div>
    </footer>
  </div>
</template>

<script>
module.exports = {
  name: "chat",
  data: function data() {
    const vm = this;
    return {
      user: undefined,
      message: '',
      messages: [
      ]
    }
  },
  created() {
    var vm = this;
    setTimeout( function(){
      componentHandler.upgradeAllRegistered();
      vm.modifyHeight();
    }, 100);
    this.checkSession();
    this.testMessages();
  },
  mounted() {
    
  },
  methods: {
    testMessages() {
      for(var i = 0; i < 20; i++) {
        this.messages.push(
          {
            type: 'text',
            data: 'Hola este es el mensaje de prueba 1',
            user_name: 'antonio',
            user_avatar: 'poop.gif',
            date: '23/11/1989 23:10'
          }
        )
      }
      console.log(this.messages);
    },
    checkSession() {
      const user = JSON.parse(localStorage.getItem('nss-chat-user'));
      if (user === null) {
        this.$router.push({ name: 'register' })
      } else {
        this.user = user;
      }
    },
    exit() {
      localStorage.setItem('nss-chat-user', null);
      this.$router.push({ name: 'register' });
    },
    getName() {
      if (this.user !== undefined) {
        console.log(this.user);
        return this.user.name;
      }
    },
    modifyHeight() {
      var body = document.body,
      html = document.documentElement;
      var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
      var elem = document.getElementById("message-content")
      if (elem !== null) {
        elem.style.height = `${height - 90}px`;
      }
    },
    urlForImage(img) {
      return './img/avatars/' + img;
    },
  }
}
</script>

<style>
  .inner {
    overflow: scroll;
    height: 520px;
    padding-top: 40px;
    background: #f0f0f0;
    
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  .inner .content {
    padding: 24px;
    position: relative;
    margin-bottom: 25px;
  }
  .mdl-mini-footer {
    padding: 0px !important;
    height: 90px;
    background-color: #d1d0d0 !important;
  }
  .mdl-grid {
    padding: 3px;
  }

  .message-wrapper {
    position: relative;
    overflow: hidden;
    
    width: 100%;
    margin: 8px;
    padding: 8px;
    display: flex;
  }
  .message-wrapper .circle-wrapper img{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    float: left;
    background-color: #ffd4d0;
  }
  
  .message-wrapper .text-wrapper {
    padding: 8px;
    min-height: 8px;
    width: 60%;
    margin: 0 8px;
    box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.3);
    border-radius: 2px;
    font-weight: 300;
    position: relative;
    background-color: #ffd4d0;
    color: #2f2f2f;
  }
</style>