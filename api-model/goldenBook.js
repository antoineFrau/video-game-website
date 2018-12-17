const express = require('express');
module.exports =  function(db) {
    var api = express.Router();
    // GET /users
    api.get('/', (req, res) => {
        const posts = db.get('posts_book')
            .value()
        res.send(jsonSuccessData('All posts', posts))
    })
    
    // POST /users/signup
    api.post('/add-post', (req, res) => {
        console.log(req.body)
        text = req.body.text
        username = req.body.username
        ua = req.body.user_agents
        db.get('posts_book')
            .push({
                id: Date.now().toString(),
                username: username,
                text: text,
                user_agents: ua
            })
            .write()
        
        const posts = db.get('posts_book')
            .value()
        if(!isEmpty(posts)){
            delete posts['user_agents']
        }
        res.send(jsonSuccessData('Successfuly created', posts))
    })

    function jsonSuccessData(m, d) {
        return { error: false, code: 200, message: m, data: d }
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