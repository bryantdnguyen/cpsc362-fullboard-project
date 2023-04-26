// Logic to handle the ejs files (html files)
// Command to run the server: npm run devStart (make sure its a bash terminal in VScode)
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://smelwani:X9Bf55WrpVLXICNC@csufapp.w50iy6b.mongodb.net/test";

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Define the Question schema
const questionSchema = new mongoose.Schema({
  question: String,
  date: Date,
  email: String,
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !email.endsWith('@csu.fullerton.edu')) {
    res.status(400).send('Invalid email or password');
    return;
  }
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
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  const user = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });

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
  res.render('main.ejs');
});

// Modify the discussion-page route
app.get('/discussion-page', async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ date: -1 }).exec();
    const user = await User.findOne({ email: req.query.email });
    let firstName = '';
    let lastName = '';
    if (user) {
      firstName = user.firstName;
      lastName = user.lastName;
      console.log(`Retrieved user: ${user}`);
      console.log(`First name: ${firstName}, Last name: ${lastName}`);
    }
    res.render('discussion-page.ejs', { questions: questions, email: req.query.email, firstName: firstName, lastName: lastName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


app.post('/discussion-page', async (req, res) => {
  const question = new Question({
    question: req.body.question,
    date: new Date(),
  });

  try {
    await question.save();
    res.redirect('/discussion-page');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

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
