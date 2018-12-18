<template>
  <nav class="navbar has-shadow has-background-white is-tab is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Accueil
        </a>
        <div class="navbar-burger burger" v-on:click="showMenu = !showMenu" v-bind:class="{ 'is-active': showMenu }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-bind:class="{ 'is-active': showMenu }" class="navbar-menu">
        <div class="navbar-start">
          
        </div>

        <div class="navbar-end" v-if="!showUserMenuLogged">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button" href="/login">
                  <span class="icon">
                    <i class="fas fa-user"></i>
                  </span>
                  <span>Sign in</span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" href="/signup">
                  <span class="icon">
                    <i class="fas fa-user-plus"></i>
                  </span>
                  <span>Sign up</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="showUserMenuLogged">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button" href="/user-panel">
                  <span class="icon">
                    <i class="fas fa-user"></i>
                  </span>
                  <span>Profil</span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" href="/games">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Games</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    showMenu: false
  }),
  computed:{
    showUserMenuLogged () {
      if(this.$store.getters.doesConnected)
        return true
      return false
    }
  }
}
</script>