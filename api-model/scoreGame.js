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

        text = req.body.score
        game = req.body.game
        username = req.body.username
        ua = req.body.user_agents

        db.get('game_scores')
            .push({
                id: Date.now().toString(),
                username: username,
                text: text,
                game: game,
                user_agents: ua
            })
            .write()
        const posts = db.get('game_scores')
            .value()
        delete user['user_agents']
        res.send(jsonSuccessData('Successfuly created', post))
    })

    // POST /score-game/score-by-game/:game
    api.post('/score-by-game/:game', (req, res) => {
        db.get('game_scores')
            .remove({ id: req.params.game })
            .write()
            .then(scores => res.send(jsonSuccessData('Successfuly delteted', scores)))
    })

    function jsonSuccessData(m, d) {
        return { error: false, code: 200, message: m, data: d }
    }
    return api;
}