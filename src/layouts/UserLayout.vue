<template>
    <div class="user-panel" v-if="redirectIfAlreadyConnected">
        <!-- START NAV -->
        <nav class="navbar has-shadow">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item brand-text" href="/">
            Accueil
            </a>
                    <div class="navbar-burger burger" data-target="navMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="field is-grouped">
                      <p class="control">
                        <a class="bd-tw-button button" @click="logout">
                          <span class="icon">
                            <i class="fas fa-user"></i>
                          </span>
                          <span>Deconnexion</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </nav>
        <!-- END NAV -->
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <aside class="menu">
                        <p class="menu-label">
                            Games
                        </p>
                        <ul class="menu-list">
                            <li><a href="/user-panel">Dashboard</a></li>
                            <li><a href="/user-panel/games-pendu">Pendu</a></li>
                            <li><a href="/user-panel/games-snake">Snake</a></li>
                        </ul>
                    </aside>
                </div>
                <div class="column is-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  export default {
    computed: {
      redirectIfAlreadyConnected () {
        if(!this.$store.getters.doesConnected)
          this.$router.push('login')
        
        return true
      }
    },
    methods: {
      logout () {
        this.$store.commit('logout')
      }
    }
  }
</script>

<style>
.user-panel nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}
.user-panel.navbar-item.brand-text {
  font-weight: 300;
}
.user-panel.navbar-item, .navbar-link {
  font-size: 14px;
  font-weight: 700;
}
.user-panel.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}
.user-panel.menu-label {
  color: #8F99A3;
  letter-spacing: 1.3;
  font-weight: 700;
}
.user-panel.menu-list a {
  color: #0F1D38;
  font-size: 14px;
  font-weight: 700;
}
.user-panel.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}
.user-panel.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}
.user-panel.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.user-panel.card-header-title {
  color: #8F99A3;
  font-weight: 400;
}
.user-panel.info-tiles {
  margin: 1rem 0;
}
.user-panel.info-tiles .subtitle {
  font-weight: 300;
  color: #8F99A3;
}
.user-panel.hero.welcome.is-info {
  background: #36D1DC;
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
  background: linear-gradient(to right, #5B86E5, #36D1DC);
}
.user-panel.hero.welcome .title, .hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.user-panel.card .content {
  font-size: 14px;
}
.user-panel.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8F99A3;
}
.user-panel.card-footer-item:hover {
}
.user-panel.card-table .table {
  margin-bottom: 0;
}
.user-panel.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}
</style>
