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
        <div class="message-wrapper" v-for="(mes, i) in orderedMessages" v-bind:key="`${i}`">
            <!-- My messages -->
            <div class="text-wrapper me" v-if="user && mes.session_id == user.session_id">
              <div class="text-header">
                {{'Tú - ' + mes.date}}
              </div>
              <div class="text-content">
                {{mes.message}}
              </div>
            </div>
            <div class="circle-wrapper me"
              v-if="user && mes.session_id == user.session_id">
              <img :src="urlForImage(mes.user_avatar)">
            </div>

            <!-- Their messages -->
            <div class="circle-wrapper"
              v-if="user && mes.session_id != user.session_id">
              <img :src="urlForImage(mes.user_avatar)">
            </div>
            <div class="text-wrapper" v-if="user && mes.session_id != user.session_id">
              <div class="text-header">
                {{mes.user_name + ' - ' + mes.date}}
              </div>
              <div class="text-content">
                {{mes.message}}
              </div>
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
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" @click="sendMessage">
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
      server: '',
      message: '',
      messages: [
      ],
      intervalMessage: undefined
    }
  },
  created() {
    var vm = this;
    setTimeout( function(){
      componentHandler.upgradeAllRegistered();
      vm.modifyHeight();
    }, 200);
    this.checkSession();
    this.getMessages();
    this.intervalMessage = setInterval(this.getMessages, 3000);
  },
  computed: {
    orderedMessages() {
      return this.messages.sort((a,b) => {
        return ((a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0));
      });
    }
  },
  destroyed() {
    clearInterval(this.intervalMessage);
  },
  methods: {
    getMessages() {
      const url = this.server + '/messages/';
      const otherParams = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
          "Access-Control-Request-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        method: 'GET'
      };

      fetch(url, otherParams).then(res => res.json())
      .then(response => {
        this.messages = response;
        this.scrollBottom();
      })
      .catch(error => {
        console.log(error);
      });
    },
    checkSession() {
      const user = JSON.parse(localStorage.getItem('nss-chat-user'));
      if (user === null) {
        this.$router.push({ name: 'register' })
      } else {
        this.user = user;
      }

      const server = JSON.parse(localStorage.getItem('nss-chat-server'));
      if (server === null) {
        this.$router.push({ name: 'register' })
      } else {
        this.server = server.server;
      }
    },
    exit() {
      //Not remove session from server
      localStorage.setItem('nss-chat-user', null);
      this.$router.push({ name: 'register' });
    },
    getName() {
      if (this.user !== undefined) {
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
    sendMessage() {
      const url = this.server + '/messages/';
      const message = {
        message: {
          user_avatar: this.user.image,
          user_name: this.user.name,
          session_id: this.user.session_id,
          message: this.message,
          type: 'text'
        }
      }
      const otherParams = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
          "Access-Control-Request-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        method: 'POST',
        body: JSON.stringify(message)
      };

      fetch(url, otherParams).then(res => res.json())
      .then(response => {
        this.message = '';
        this.messages.push(response);
        this.scrollBottom();
      })
      .catch(error => {
        console.log(error);
      });
    },
    scrollBottom() {
      setTimeout(() => {
        var objDiv = document.getElementById("message-content");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 200);
    }
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
    background-color: #e9e6e7 !important;
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

  .message-wrapper .circle-wrapper.me img{
    background-color: #c8ffcd;
  }
  
  .message-wrapper .text-wrapper {
    padding: 8px;
    min-height: 8px;
    width: 80%;
    margin: 0 8px;
    box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.3);
    border-radius: 2px;
    font-weight: 300;
    position: relative;
    background-color: #ffd4d0;
    color: #2f2f2f;
  }
  .message-wrapper .text-wrapper.me{
    background-color: #c8ffcd;
  }
  .text-header {
    color: #840827;
    font-size: smaller;
  }
</style>