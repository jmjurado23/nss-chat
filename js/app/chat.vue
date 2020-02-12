<template>
  <div id="chat-page">
  <h1>
    Chat
  </h1>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" @click="exit">
    Salir
  </button>
</div>

</template>

<script>
module.exports = {
  name: "chat",
  data: function data() {
    const vm = this;
    return {
    }
  },
  created() {
    setTimeout( function(){
      componentHandler.upgradeAllRegistered();
    }, 100);
    this.checkSession();
  },
  methods: {
    checkSession() {
      const user = JSON.parse(localStorage.getItem('nss-chat-user'));
      if (user === null) {
        this.$router.push({ name: 'register' })
      }
    },
    exit() {
      localStorage.setItem('nss-chat-user', null);
      this.$router.push({ name: 'register' });
    }
  }
}
</script>

<style>

</style>