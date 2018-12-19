<template>
  <div class="hangman">
      <div class="title">Le jeu du Pendu autour des animaux..<br/>
      Il vous reste {{wordBank.length}} mots à trouver..<br/>
      Vous avez le droit qu'a une seule partie</div>
      <div v-if="gameIsFinished" class="title">
        {{strikesGlobal}} faute(s).
      </div>
      <div v-if="wordFounded" class="subtitle has-text-success">
        Mot trouvée ! Passez au suivant !
      </div>
      <div v-if="wordNotFounded" class="subtitle has-text-danger">
        Perdu pour ce mot ! Passez au suivant !
      </div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="260px" viewBox="0 0 350 275"
      preserveAspectRatio="xMidYMid meet">
      <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:black;fill:none;stroke-width:2px;" />
      <circle v-if="strikes > 5" cx="230" cy="90" style="fill:khaki;stroke:black;stroke-width:2px;" r="20" />
      <line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="120" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="120" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="200" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="200" style="stroke:black;fill:none;stroke-width:2px;" />
    </svg>
    <div>
      <div class="letter" v-for="letter in wordDisplayLetters">
        {{letter}}
      </div>
    </div>
    <template v-if="initialized">
      <div>
        <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters1">
          {{letter}}
        </div>
      </div>
      <div>
        <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters2">
          {{letter}}
        </div>
      </div>
      <div>
        <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters3">
          {{letter}}
        </div>
      </div>
    </template>
    <button v-if="gameIsFinished" @click="initialize()">{{buttonText}}</button>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    data: () => ({
        strikes: 12,
        strikesGlobal: 0,
        buttonText: 'Nouvelle partie',
        word: "PENDU",
        wordLetters: ['P', 'E', 'N', 'D', 'U'],
        wordDisplayLetters: ['P', 'E', 'N', 'D', 'U'],
        usedLetters: [],
        possibleLetters1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        possibleLetters2: ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
        possibleLetters3: ["T", "U", "V", "W", "X", "Y", "Z"],
        initialized: false,
        gameIsFinished: true,
        wordFounded: false,
        wordNotFounded: false,
        wordBank: ['TORTUE', 'ORNITHORYNQUE', 'ELEPHANT', 'GUEPARD', 'ECUREUIL'],
        currWordBandIndex: 0,
        header: {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
    }),
    methods: {
      initialize () {
        if(this.wordBank.length <= 0){
          this.gameIsFinished = true
          return
        }
        this.wordFounded = false
        this.wordNotFounded = false
        this.initialized = true
        this.gameIsFinished = false
        this.buttonText = 'Mot suivant'
        this.strikes = 0
        this.word = this.getRandomWord()
        this.wordLetters = this.word.split('')
        this.wordDisplayLetters = Array(this.word.length)
        this.usedLetters = []
      },
      getRandomWord () {
        let index = Math.random() * (this.wordBank.length - 0)
        index = Math.floor(index)
        
        let word = this.wordBank[index]
        this.currWordBandIndex = index
        return word
      },
      tryLetter (letter) {
        if (this.usedLetters.includes(letter))
          return

        this.usedLetters.push(letter)
        let match = false
        for (let i = 0; i < this.wordDisplayLetters.length; i++) {
          if (letter === this.wordLetters[i]) {
            this.wordDisplayLetters.splice(i, 1, letter)
            match = true
          }
        }
        if (!match) {
          this.strikes++
        }
        this.isGameEnded()
      },
      getStrikethroughClass (letter) {
        if (this.usedLetters.includes(letter)) {
          return 'diagonal-strike'
        }
        return null
      },
      isGameEnded () {
          var end = false
          if(this.strikes > 10){
            end = true
            this.wordNotFounded = true 
          } else if (JSON.stringify(this.wordDisplayLetters) == JSON.stringify(this.wordLetters)){
            end = true
            this.wordFounded = true
          }
          if (end) {
            this.initialized = false
            this.wordDisplayLetters = this.wordLetters
            this.strikesGlobal += this.strikes 
            this.gameIsFinished = true
            this.wordBank.splice(this.currWordBandIndex, 1)
            if(this.wordBank.length <= 0){
              this.gameIsFinished = true
              this.sendScore()
              return
            }
          }
          return false
      },
      sendScore: function () {
        let userScore = {
          user_id: this.$store.getters.getUserId,
          hangman: this.strikesGlobal,
          username: this.$store.getters.getUserName,
          game: 'hangman',
          user_agents: window.navigator.userAgent,
        }
        this.$axioshttp
          .post('http://localhost:5000/api/score-game/add-score-game', userScore, this.header)
          .then(response => {
              console.log(response)
          })
          .catch(error => {
              console.log(error)
          })
      }
    }
  }
</script>

<style>
.hangman {
    text-align: center;
  }
.letter {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 0px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  vertical-align: bottom;
}
.possibleLetter {
  display: inline-block;
  margin: 10px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  cursor: pointer;
}
.diagonal-strike {
  background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%);
  color: dimgrey;
}
button {
  margin-top: 20px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}
button:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
}
</style>