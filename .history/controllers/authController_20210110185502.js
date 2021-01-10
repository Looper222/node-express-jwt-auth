// controller actions
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle erors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate error values
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  }
}

const maxAge = 1*24*60*60;

// create a token
const createToken = (id) => {
  return jwt.sign({ id }, 'node course with jwt', {
    expiresIn: maxAge
  });
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
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('authorizedUser', token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post
}