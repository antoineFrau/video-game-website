<template>
    <div v-if="redirectIfAlreadyConnected">
        <section class="hero is-info is-fullheight">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-6 is-offset-3">
                        <h1 class="title">
                            User Panel
                        </h1>
                        <div class="box">
                            <div class="field is-grouped">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="Message">
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
      redirectIfAlreadyConnected () {
          console.log("aaa")
        if(!this.$store.getters.doesConnected)
		  this.$router.push('login')
		return true
      }
    },
    props: {
      source: Boolean
    }
  }
</script>