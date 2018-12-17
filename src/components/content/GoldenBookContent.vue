<template>
    <div>
        <section class="hero is-info is-medium">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-6 is-offset-3">
                        <h1 class="title">
                            Livre d'or
                        </h1>
                        <div class="box">
                            <p class="control is-expanded">
                                    <input class="input" v-model="messageInput" type="text" placeholder="Message">
                                </p>
                            <div class="field is-grouped">
                                <p class="control is-expanded">
                                    <input class="input" v-model="usernameInput" type="text" placeholder="Username">
                                </p>
                                <p class="control">
                                    <a class="button is-info" v-on:click="createPost">
                                        Envoyer
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="hero is-medium">
            <div class="hero-body">
                <div class="columns  is-multiline">
                    <div class="column" v-for="item in posts" :key="item.id">
                        <div class="card">
                            <div class="card-content">
                                <p class="title  is-small">
                                "{{ item.text }}"
                                </p>
                                <p class="subtitle is-small">
                                {{ item.username }}
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
    data: () => ({
      posts: [],
      messageInput: '',
      usernameInput: '',
      header: {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
    }),
    methods: {
        getPosts: function () {
            this.$axioshttp
				.get('http://localhost:5000/api/golden-book')
				.then(response => {
                    this.posts = response.data.data
				})
				.catch(error => {
					console.log(error)
				})
        },
        createPost(){
            var username = (this.usernameInput == '' ? 'Anonyme' : this.usernameInput)
            var post = {
                username: username,
                text: this.messageInput,
                user_agents: window.navigator.userAgent
            }
            this.$axioshttp
				.post('http://localhost:5000/api/golden-book/add-post', post, this.header)
				.then(response => {
                    this.usernameInput = this.messageInput = ''
                    this.posts = []
                    this.getPosts()
				})
				.catch(error => {
					console.log(error)
				})
        }
    },
    beforeMount(){
        this.getPosts()
    }
  }
</script>