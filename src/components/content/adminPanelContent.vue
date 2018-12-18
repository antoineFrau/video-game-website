<template>
    <div v-if="redirectIfNotConnected">
        <section class="hero is-info is-fullheight">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-6 is-offset-3">
                        <h1 class="title">
                            Admin Panel de : {{userId}}
                        </h1>
                        <div class="box">
                            <div class="field is-grouped">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="Vous êtes l'admin bien joué">
                                </p>
                                <p class="control">
                                    <a class="button is-info">
                                        Envoyer
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    /* eslint-disable */
  export default {
    computed:{
      redirectIfNotConnected () {
        if(this.userId == undefined)
		  this.$router.push('admin-login')
		return true
      }
    },
    props: {
      userId: String
    }
  }
</script>