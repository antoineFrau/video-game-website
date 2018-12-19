<template>
  <div>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
              <article class="tile is-child box">
                  <p class="title">{{(scores.hangman == -1) ? 'Aucun score' : scores.hangman}}</p>
                  <p class="subtitle">Pendu</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                  <p class="title">{{(scores.snake == -1) ? 'Aucun score' : scores.snake}}</p>
                  <p class="subtitle">Snake</p>
              </article>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
  import RSSFeed from '@/components/content/RSSFeedContent'
    /* eslint-disable */
  export default {
    data: () => ({
      scores: {
        hangman: -1,
        snake: -1
      },
      usernameInput: '',
      header: {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }),
    components: {
      'rss-feed': RSSFeed
    },
    methods: {
      getScores: function () {
        this.$axioshttp
				.get('http://localhost:5000/api/score-game/score-by-game/'+this.$store.getters.getUserName)
				.then(response => {
          console.log(response)
            this.scores.hangman = response.data.data.hangman
            this.scores.snake = response.data.data.snake
				})
				.catch(error => {
					console.log(error)
				})
      }
    },
    beforeMount(){
        this.getScores()
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
