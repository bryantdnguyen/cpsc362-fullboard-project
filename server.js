// Logic to handle the ejs files (html files)
// Command to run the server: npm run devStart (make sure its a bash terminal in VScode)
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const uri = "mongodb+srv://smelwani:X9Bf55WrpVLXICNC@csufapp.w50iy6b.mongodb.net/test"
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  });
const User = mongoose.model('User', userSchema);


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    //res.render('index.ejs', { name: 'TEST NAME'})
    res.render('login.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email: email });
      if (!user) {
          res.status(400).send('Invalid email or password');
          return;
      }
      if (user.password !== password) {
          res.status(400).send('Invalid email or password');
          return;
      }
      res.redirect('/main');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
  }
});


app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    // Create a new User object using the form data
    const user = new User({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    });
  
    // Save the user to the database
    try {
      await user.save();
      console.log('User saved to database:', user);
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.send('Error registering user');
    }
  });

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

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }

  connect();

app.listen(3050, () => {
    console.log("Server started on port 3050");
  });
