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

app.get('/main', (req, res) => {
    res.render('main.ejs')
})

app.get('/discussion-page', (req, res) => {
    res.render('discussion-page.ejs')
})

app.get('/class1', (req, res) => {
    res.render('class1.ejs')
})

app.get('/class2', (req, res) => {
    res.render('class2.ejs')
})

app.get('/class3', (req, res) => {
    res.render('class3.ejs')
})

app.get('/class4', (req, res) => {
    res.render('class4.ejs')
})

app.listen(3050)
