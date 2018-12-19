<template>
<div>
  <section class="hero is-info">
			<div class="hero-body">
				<div class="container">
						<div class="card">
								<div class="card-content">
										<div class="content">
											<div class="dropdown is-active">
												<div class="dropdown-trigger">
													<div class="control has-icons-left has-icons-right">
															<input class="input is-large" type="search" aria-haspopup="true" aria-controls="dropdown-menu2" :placeholder="placeholderValue" v-model="searchUserInput" v-on:input="getPredictions" />
															<span class="icon is-medium is-left"><i class="fas fa-search"></i></span><span class="icon is-medium is-right"><i class="fa fa-star"></i></span>	
													</div>
												</div>
												<div class="dropdown-menu" id="dropdown-menu2" role="menu" v-if="searchUserInput != ''">
													<div class="dropdown-content" v-for="item in usernames">
														<div class="dropdown-item">
															<p>{{item.username}}</p>
														</div>
														<hr class="dropdown-divider">
													</div>
												</div>
											</div>
										</div>
								</div>
						</div>
				</div>
			</div>
		</section>
		<section class="container">
			<div class="columns">
				<div class="column is-three-fifths is-offset-one-fifth">
					<table class="table">
						<thead>
							<tr>
								<th><abbr title="Position">Position</abbr></th>
								<th><abbr title="Nom">Username</abbr></th>
								<th><abbr title="Hangman">Hangman</abbr></th>
								<th><abbr title="Snake">Snake</abbr></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in users_scores_filter">
								<th>{{index+1}}</th>
								<th>{{item.username}}</th>
								<td>{{(item.hangman == -1) ? 'Aucun score' : item.hangman}}</td>
								<td>{{(item.snake == -1) ? 'Aucun score' : item.snake}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
  /* eslint-disable */
  import Autocomplete from 'vue2-autocomplete-js'
  export default {
	  components: { Autocomplete },
	  data: () => ({
		  users_scores: [],
		  users_scores_filter: [],
		  usernames: [],
		  placeholderValue: 'Entrez un pseudo',
		  searchUserInput: ''
	  }),
	  methods: {
		getScores: function () {
			this.$axioshttp
				.get('http://localhost:5000/api/score-game')
				.then(response => {
					this.users_scores = response.data.data
					this.users_scores = this.sortedArray()
					this.users_scores_filter = this.users_scores
				})
			
		},
		getPredictions (){
			this.searchUserInput = this.searchUserInput.trim()
			if(this.searchUserInput == ''){
				this.users_scores = this.users_scores_filter
				return
			}
			var matcher = new RegExp(`^${this.searchUserInput}*`, "g");
			this.users_scores_filter = this.users_scores.filter(({ username }) => username.match(matcher));	
			this.$axioshttp
				.get('http://localhost:5000/api/score-game/username/'+this.searchUserInput)
				.then(response => {
					this.usernames = response.data.data
				})
		},
		sortedArray: function () {
			function compare(a, b) {
				if (a.snake > b.snake)
					return -1;
				if (a.snake < b.snake)
					return 1;
				return 0;
			}

			return this.users_scores.sort(compare);
		}
	},
	beforeMount(){
		this.getScores()
	}
  }
</script>