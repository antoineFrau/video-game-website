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
              <p class="control">
                <a class="button is-info" href="/score-board">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>ScoreBoard</span>
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
                <a class="button is-info">
                  <span class="icon">
                    <i class="fas fa-user"></i>
                  </span>
                  <span>{{username}}</span>
                </a>
              </p>
              <p class="control">
                <a class="button is-info" href="/score-board">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>ScoreBoard</span>
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
/* eslint-disable */
import MainMenu from '@/components/nav/Menus/MainMenu'
export default {
  data: () => ({
    showMenu: false,
    username: ''
  }),
  components: {
    'navbar': MainMenu
  },
  methods: {
    getNameUser(){
      this.$axioshttp
      .get('http://localhost:5000/api/users/'+this.$store.getters.getUserId+'/username')
      .then(response => {
          this.username = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  computed: {
    showUserMenuLogged () {
      if(this.$store.getters.doesConnected){
        this.getNameUser()
        return true
      }
      return false
    }
  }
}
</script>