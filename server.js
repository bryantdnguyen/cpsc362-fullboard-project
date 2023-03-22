// Logic to handle the ejs files (html files)
// Command to run the server: npm run devStart (make sure its a bash terminal in VScode)
const express = require('express')
const app = express()

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    //res.render('index.ejs', { name: 'TEST NAME'})
    res.render('login.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    req.body.email
})
app.listen(3050)
