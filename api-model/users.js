const express = require('express');
module.exports =  function(db) {
    var api = express.Router();
    // GET /users
    api.get('/', (req, res) => {
        const users = db.get('users')
            .value()
        res.send(jsonSuccessData('All users', users))
    })
    
    // GET /users/:id
    api.get('/:id', (req, res) => {
        console.log(req.params.id)
        const user = db.get('users')
            .find({ id: req.params.id })
            .value()
        if (isEmpty(user))
            res.status(404).send(jsonError('User not found ! Please login in !'))
        res.send(jsonSuccessData('User found !', user))
    })

    // GET /users/delete/:id
    api.get('/delete/:id', (req, res) => {
        db.get('users')
            .remove({ id: req.params.id })
            .write()
            .then(res.send(jsonSuccess('Successfuly delteted')))
    })

    // POST /users/login
    api.post('/login', (req, res) => {
        psw = req.body.password
        email = req.body.email
        
        if (!isEmailExist(email)) {
            res.status(404).send(jsonError('This email doesn\'t exist !'))
            return
        }
        const user = db.get('users')
            .find({ 
                email: email,
                password: psw
            })
            .value()
        delete user['password']
        delete user['email']
        delete user['user_agents']
        res.send(jsonSuccessData('Sucessfuly connected !', user))
    })

    // POST /users/signup
    api.post('/signup', (req, res) => {

        psw = req.body.password
        email = req.body.email
        ua = req.body.user_agents
        
        if (isEmailExist(email)){
            res.status(404).send(jsonError('Email already exist !'))
            return
        }

        db.get('users')
            .push({
                id: Date.now().toString(),
                email: email,
                password: psw,
                user_agents: ua
            })
            .write()
        
        const user = db.get('users')
            .find({
                email: email,
                password: psw
            })
            .value()
        res.send(jsonSuccessData('Successfuly created', user.id))
    })

    function isEmailExist(email){
        const user = db.get('users')
            .find({
                email: email
            })
            .value()
        return !isEmpty(user)
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

    function jsonError(m) {
        return { error: true, code: 404, message: m }
    }

    function jsonSuccess(m) {
        return { error: false, code: 200, message: m }
    }

    function jsonSuccessData(m, d) {
        return { error: false, code: 200, message: m, data: d }
    }
    return api;
}