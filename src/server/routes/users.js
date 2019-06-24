const express = require('express');
const User = require('../schemaModel/userModel');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/', (req, res) => {
  res.send({
    message: 'Users API success in Registick App'
  });
});

// Register new user
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // Check required fields
  if (!firstName || !lastName || !email || !password) {
    res.send({
      error: 400,
      message: 'All information are requiered'
    });
  }

  // Check password length
  if (password.length < 6) {
    res.send({
      error: 400,
      message: 'Password should be at least 6 characters'
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exists
        res.send({
          error: 400,
          message: 'Email is already registered'
        });
      } else {
        let registrationDate = new Date();
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          about: '',
          country: '',
          city: '',
          zip: '',
          phone: '',
          registrationDate: registrationDate
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser.save().then(user => {
              res.send({
                error: 0,
                loggedInUser: user,
                message: 'You are now registered and can log in'
              });
            });
          })
        );
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.send({ error: 400, message: 'Email is not registered' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = user.generateAuthToken();
        // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'email']));
        return res
          .header('x-auth-token', token)
          .send({ error: 0, loggedInUser: user, tokenId: token });
      } else {
        return res.send({ error: 400, message: 'Incorrect password' });
      }
    });
  });
});

// Login by token
router.post('/login/auth', auth, (req, res) => {
  User.findById(req.body.userId).then(user => {
    if (!user) return res.send({ error: 400, message: 'No user logged In!' });
    res.send({
      error: 0,
      loggedInUser: user,
      message: 'this user authenticated'
    });
  });
});

// Logout Handle
router.get('/logout', (req, res) => {
  res.send({ error: 0, message: 'You are loged out' });
});

module.exports = router;
