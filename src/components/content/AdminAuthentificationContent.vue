<template>
  <div id="login">
  <div class="login-card">

    <div class="card-title">
      <h1>Authentification</h1>
    </div>

    <div class="content">
		<transition name="fade">
		<article class="message is-info" v-if="sendProgress">
			<div class="message-body card notification has-icons-right">
			<i class="fas fa-spinner fa-spin"></i>&emsp;&emsp;Envoie de l'e-mail en cours.
			</div>
		</article>
		</transition>
		<transition name="bounce">
		<article class="message is-danger" v-if="sendFail">
			<div class="message-body card notification is-transparent">
			Erreur lors de la connection. Verifier votre email / mot de passe.
			<a class="button" v-on:click="close()">
				<span class="icon is-small">
					<i class="fas fa-times"></i>
				</span>
			</a>
			</div>
		</article>
		</transition>
		<form id="form">
			<div class="columns is-centered">
				<div class="field">
					<label class="label">E-mail</label>
					<div class="control has-icons-left has-icons-right">
						<input id="email" v-model="emailInput" v-on:input="isEmailValid()" v-bind:class="{ 'is-danger': mailError }" type="email" autofocus/>
						<span class="icon is-small has-text-danger is-right" v-if="mailError">
						<i class="fas fa-exclamation-triangle"></i>
						</span>
					</div>
					<p class="help is-danger" v-if="mailError">E-mail invalide.</p>
				</div>
			</div>
			<div class="columns is-centered"></div>
			<div class="columns is-centered">
				<div class="field">
					<label class="label">Password</label>
					<div class="control has-icons-left has-icons-right">
					<input id="password" v-model="passwordInput" v-on:input="passwordChange()" v-bind:class="{ 'is-danger': passwordError }" type="password"/>
					<span class="icon is-small has-text-danger is-right" v-if="passwordError">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					</div>
					<p class="help is-danger" v-if="passwordError">Veuillez saisir un message.</p>
				</div>
			</div>
			<div class="level options">
				<div class="checkbox level-left">
					<input type="checkbox" checked id="checkbox" class="regular-checkbox">
					<label for="checkbox"></label>
					<span>Se souvenir de moi</span>
				</div>
				<a class="btn btn-link level-right" href="/signup">Creer un compte?</a>
			</div>
			<div class="columns is-centered">
				<div class="column">
				<div class="field">
					<div class="control">
					<div class="button send-mail is-primary is-outlined is-medium is-fullwidth is-rounded" v-on:click="loginAdmin">Connexion</div>
					</div>
				</div>
				</div>
			</div>
		</form>
    </div>
  </div>
</div>
</template>

<script>
	/* eslint-disable */
  export default {
    data: () => ({
		mailError: false,
		passwordError: false,
		sendFail: false,
		sendSucess: false,
		sendProgress: false,
		emailInput: '',
		passwordInput: '',
		regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
		user:{
			email: '',
			password: '',
			user_agents: window.navigator.userAgent
		},
		header: {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	}),
	methods: {
		loginAdmin: function(){
			this.mailError = this.emailInput == '' ? true : false
			this.passwordError = this.passwordInput == '' ? true : false
			if(!this.mailError && !this.passwordError){
				this.user.email = this.emailInput
				this.user.password = this.passwordInput
				this.sendProgress = true
				this.$axioshttp
				.post('http://localhost:5000/api/users-admin/login', this.user, this.header)
				.then(response => {
					this.$router.push('admin-panel')
				})
				.catch(error => {
					this.sendFail = true
				})
				.finally(() => this.sendProgress = false)
			}
		},
		isEmailValid: function(){
			this.mailError = (this.emailInput == '')? true : (this.regEmail.test(this.emailInput)) ? false : true;
		},
		passwordChange: function(){
			this.passwordError = false
		},
		reset: function(event){
			this.emailInput = this.passwordInput = ''
			this.mailError = this.passwordError = false
		},
		close: function(event){
			this.sendSucess = false
			this.sendFail = false
		},
		successLogin: function(id){
			this.$store.commit('login', id)
		}
	}
}
</script>
<style lang="scss">
  $primary:      hsl(171, 100%, 41%);
  $grey-darker:  hsl(0, 0%, 21%);
  $grey-dark:    hsl(0, 0%, 29%);
  $grey:         hsl(0, 0%, 48%);
  $grey-light:   hsl(0, 0%, 71%);
  $grey-lighter: hsl(0, 0%, 86%);
  #login {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: #F7F7F7;

	.login-card {
		background: #fff;
		width: 24rem;
		box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);

		.card-title {
			background-color: darken($primary, 5%);
			padding: 2rem;

			h1 {
				color: #fff;
				text-align: center;
				font-size: 1.2rem;
			}
		}

		.content {
			padding: 3rem 2.5rem 5rem;
		}

		#email, #password {
			display: block;
			width: 100%;
			font-size: 1rem;
			padding: 0.25rem 0;
			border: none;
			border-bottom: 1px solid $grey-lighter;
			transition: all .5s;

			&:hover {
				border-color: $grey;
			}

			&:active, &:focus {
				border-color: $primary;
			}
		}

		.checkbox {
			color: $grey-light;
			font-size: 0.8rem;

			span {
				margin-left: 0.5rem;
			}
		}

		a {
			font-size: 0.8rem;
		}

		.options {
			color: $grey-light;
			margin-bottom: 1.5rem;
		}

		button {
			cursor: pointer;
			font-size: 1.2rem;
			color: $primary;
			border-radius: 4rem;
			display: block;
			width: 100%;
			background: transparent;
			border: 2px solid $primary;
			padding: 0.9rem 0 1.1rem;
			transition: color .5s, border-color .5s;

			&:hover, &:focus {
				color: darken($primary, 10%);
				border-color: darken($primary, 10%);
			}

			&:active {
				transform: translateY(1px);
			}
		}
	}
}

label {
	cursor: pointer;
}

.regular-checkbox {
	display: none;
}

.regular-checkbox + label {
	background-color: #fafafa;
	border: 1px solid $grey-lighter;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	padding: 7px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
}

.regular-checkbox:checked + label {
	background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
	content: '\2714';
	font-size: 11px;
	position: absolute;
	top: 0;
	left: 3px;
	color: $grey-light;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}
</style>