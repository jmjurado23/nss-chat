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
      </div>
    </div>
    <footer class="mdl-mini-footer">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--3-col-phone">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="name" v-model="message">
            <label class="mdl-textfield__label" for="message">Messaje</label>
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
      message: ''
    }
  },
  created() {
    var vm = this;
    setTimeout( function(){
      componentHandler.upgradeAllRegistered();
      vm.modifyHeight();
    }, 100);
    this.checkSession();
  },
  mounted() {
    
  },
  methods: {
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
      document.getElementById("message-content").style.height = `${height - 90}px`;
    }
  }
}
</script>

<style>
  .inner {
    overflow: scroll;
    height: 520px;
    padding-top: 40px;
    background: #e2e2e2;
    
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  .inner .content {
    padding: 40px;
    position: relative;
    margin-bottom: 25px;
  }
  .mdl-mini-footer {
    padding: 0px !important;
    height: 90px;
    background-color: #888 !important;
  }
  .mdl-grid {
    padding: 3px;
  }
</style>