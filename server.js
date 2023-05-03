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
const discussionSchema = new mongoose.Schema({
  question: String,
});

const class1Schema = new mongoose.Schema({
  question: String,
});

const class2Schema = new mongoose.Schema({
  question: String,
});

const class3Schema = new mongoose.Schema({
  question: String,
});

const class4Schema = new mongoose.Schema({
  question: String,
});

const class5Schema = new mongoose.Schema({
  question: String,
});

// Create the User Schema
const User = mongoose.model('User', userSchema);

// Create the all question Schemas
const Discussion = mongoose.model('Discussion', discussionSchema);

const class1 = mongoose.model('class1', class1Schema);

const class2 = mongoose.model('class2', class2Schema);

const class3 = mongoose.model('class3', class3Schema);

const class4 = mongoose.model('class4', class4Schema);

const class5 = mongoose.model('class5', class5Schema);

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
  const {email} = req.body;
  if (!email || !email.endsWith('@csu.fullerton.edu')) {
    res.status(400).send('Invalid email or password');
    return;
  }
  else{
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
  }
});

app.get('/main', (req, res) => {
  res.render('main.ejs');
});

// Modify the discussion-page route
app.get('/discussion-page', async (req, res) => {
  try {
    const questions = await Discussion.find({}).sort({ date: -1 }).exec();
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
    const question = new Discussion({
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

app.get('/class1', async (req, res) => {
    try {
      const questions = await class1.find({}).sort({ date: -1 }).exec();
      const user = await User.findOne({ email: req.query.email });
      let firstName = '';
      let lastName = '';
      if (user) {
        firstName = user.firstName;
        lastName = user.lastName;
        console.log(`Retrieved user: ${user}`);
        console.log(`First name: ${firstName}, Last name: ${lastName}`);
      }
      res.render('class1.ejs', { questions: questions, email: req.query.email, firstName: firstName, lastName: lastName });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
});

app.post('/class1', async (req, res) => {
    const question = new class1({
    question: req.body.question,
    date: new Date(),
  });

  try {
    await question.save();
    res.redirect('/class1');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get('/class2', async (req, res) => {
  try {
    const questions = await class2.find({}).sort({ date: -1 }).exec();
    const user = await User.findOne({ email: req.query.email });
    let firstName = '';
    let lastName = '';
    if (user) {
      firstName = user.firstName;
      lastName = user.lastName;
      console.log(`Retrieved user: ${user}`);
      console.log(`First name: ${firstName}, Last name: ${lastName}`);
    }
    res.render('class2.ejs', { questions: questions, email: req.query.email, firstName: firstName, lastName: lastName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/class2', async (req, res) => {
  const question = new class2({
  question: req.body.question,
  date: new Date(),
});

try {
  await question.save();
  res.redirect('/class2');
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
}
});

app.get('/class3', async (req, res) => {
  try {
    const questions = await class3.find({}).sort({ date: -1 }).exec();
    const user = await User.findOne({ email: req.query.email });
    let firstName = '';
    let lastName = '';
    if (user) {
      firstName = user.firstName;
      lastName = user.lastName;
      console.log(`Retrieved user: ${user}`);
      console.log(`First name: ${firstName}, Last name: ${lastName}`);
    }
    res.render('class3.ejs', { questions: questions, email: req.query.email, firstName: firstName, lastName: lastName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/class3', async (req, res) => {
  const question = new class3({
  question: req.body.question,
  date: new Date(),
});

try {
  await question.save();
  res.redirect('/class3');
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
}
});

app.get('/class4', async (req, res) => {
  try {
    const questions = await class4.find({}).sort({ date: -1 }).exec();
    const user = await User.findOne({ email: req.query.email });
    let firstName = '';
    let lastName = '';
    if (user) {
      firstName = user.firstName;
      lastName = user.lastName;
      console.log(`Retrieved user: ${user}`);
      console.log(`First name: ${firstName}, Last name: ${lastName}`);
    }
    res.render('class4.ejs', { questions: questions, email: req.query.email, firstName: firstName, lastName: lastName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/class4', async (req, res) => {
  const question = new class4({
  question: req.body.question,
  date: new Date(),
});

try {
  await question.save();
  res.redirect('/class4');
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
}
});

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
