const express = require('express');
module.exports =  function(db) {
    var api = express.Router();
    // GET /score-game
    api.get('/', (req, res) => {
        const scores = db.get('game_scores')
            .value()
        res.send(jsonSuccessData('All scores',scores))
    })
    
    // POST /score-game/add-score-game
    api.post('/add-score-game', (req, res) => {
        
        let ua = req.body.user_agents
        let game_name = req.body.game
        let score_snake = req.body.snake
        let score_hangman = req.body.hangman
        let username = req.body.username 

        let game_score = db.get('game_scores')
            .find({username: username})
            .value()

        console.log(req.body)
        if(!isEmpty(game_score)){
            if(game_name == 'hangman'){
                //Hangman need the loest errors
                if(game_score.hangman == -1){
                    db.get('game_scores')
                        .find({ username: username })
                        .assign({ hangman: score_hangman })
                        .write()
                }else {
                    res.status(502).send(jsonError('Can\'t restart this game'))
                } 
            }else {
                if (game_score.snake > score_snake) {
                    res.status(502).send(jsonError('Already better score'))
                } else {
                    db.get('game_scores')
                        .find({ username: username})
                        .assign({ snake: score_snake })
                        .write()

                }
            }
            return
        }

        if(game_name == 'hangman')
            db.get('game_scores')
                .push({
                    id: Date.now().toString(),
                    username: username,
                    hangman: score_hangman,
                    snake: -1,
                    user_agents: ua
                })
                .write()
        else
            db.get('game_scores')
                .push({
                    id: Date.now().toString(),
                    username: username,
                    snake: score_snake,
                    hangman: -1,
                    user_agents: ua
                })
                .write()

        res.send(jsonSuccess('Successfuly created'))
    })

    // GET /score-game/:username
    api.get('/score-by-game/:username', (req, res) => {
        let u = req.params.username
        let game_score = db.get('game_scores')
            .find({ username: u })
            .value()
        res.send(jsonSuccessData('Score by game', game_score))
    })
    
    // GET /username/:input
    api.get('/username/:input', (req, res) => {
        var matcher = new RegExp(`^${req.params.input}*`, "g");
        let usersnames = db.get('game_scores')
            .value()

        const filteredUsername = usersnames.filter(({ username }) => username.match(matcher));

        res.send(jsonSuccessData('Score by game', filteredUsername))
    })



    function jsonSuccessData(m, d) {
        return { error: false, code: 200, message: m, data: d }
    }
    
    function jsonError(m) {
        return { error: true, code: 404, message: m }
    }

    function jsonSuccess(m) {
        return { error: false, code: 200, message: m }
    }

    let isEmpty = (val) => {
        let typeOfVal = typeof val
        switch (typeOfVal) {
            case 'object':
                return (val.length == 0) || !Object.keys(val).length
                break
            case 'string':
                let str = val.trim()
                return str == '' || str == undefined
                break
            case 'number':
                return val == ''
                break
            default:
                return val == '' || val == undefined
        }
    }

    return api;
}