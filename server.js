var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
var cors = require('cors')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// Create database instance and start server
const adapter = new FileAsync('db.json')
const userRoute = require(__dirname + '/api-model/users.js')
const goldenBook = require(__dirname + '/api-model/goldenBook.js')
const scoreGame = require(__dirname + '/api-model/scoreGame.js')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({ origin: true, credentials: true }))
// default route
app.get('/api', function (req, res) {
    return res.send({ error: true, code: 200, message: 'Welcome to the API.' })
})

low(adapter)
    .then(db => {
        app.use('/api/users', userRoute(db))
        app.use('/api/golden-book', goldenBook(db))
        app.use('/api/score-game', scoreGame(db))
    })

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
