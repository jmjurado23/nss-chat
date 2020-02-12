<template>
  <div id="register-page">
    <div id="header-register">
      
      <img src="./img/icons/android-icon-96x96.png"/>
      <h2 class="center">
        NSS Chat
      </h2>
      <h4 class="center">
        ¡Bienvenido!
      </h4>
    </div>

    <div id="register-form">
      <p>
        Seleccione su avatar e introduzca su nombre:
      </p>
      <div class="card">
        <div class="container">
          <div id="avatar" @click="showModal()">
            <img :src="getUrlImage()" alt="Avatar" sty>
          </div>
          <form action="#">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="name">
              <label class="mdl-textfield__label" for="name">Nombre</label>
            </div>
          </form>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Entrar
          </button>
        </div>
      </div>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal" v-bind:class="{ block: modal }">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Selecciona tu avatar:</p>
        <div class="img-modal" v-for="img in images" v-bind:key="img">
          <img :src="urlForImage(img)" @click="selectImg(img)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "register",
  data: function data() {
    const vm = this;
    return {
      image: 'banana.gif',
      images: ['banana.gif', 'parrot.gif', 'poop.gif'],
      modal: false
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    getUrlImage() {
      return '../img/avatars/' + this.image;
    },
    showModal() {
      this.modal = true;
    },
    urlForImage(img) {
      return '../img/avatars/' + img;
    },
    selectImg(img) {
      this.image = img;
      this.modal = false;
    },
    closeModal() {
      this.modal = false;
    }
  }
}
</script>

<style>
  #header-register {
    margin: 24px;
    margin-top: 64px;
    text-align: center;
  }

  #register-form {
    margin: 32px 24px 0px 24px; 
  }

  #avatar {
    height: 140px;
    background-color: gainsboro;
    border: 2px solid red;
    border-radius: 5px;
  }

  #avatar img{
    max-height: 120px;
  }

  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: rgb(255, 255, 255)
  }

  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  /* Add some padding inside the card container */
  .container {
    padding: 14px 16px 8px 16px;
    text-align: center;
  }
  
  .img-modal {
    margin: 4px 64px 4px 64px;
    padding: 8px;
    border: 2px solid red;
    border-radius: 5px;
    text-align: center;
  }
  .img-modal img{
    max-height: 120px;
    max-width: 120px;
  }
</style>