// controller actions
const User = require('../models/User');

// handle erors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { email: '', password: ''};

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      console.log(properties);
    });
  }
}

const signup_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login');
}

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user);
  }
  catch (err) {
    handleErrors(err);
    res.status(400).send('error, user not created');
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post
}