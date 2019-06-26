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
    res.status(400).send({
      message: 'All information are requiered'
    });
  }

  // Check password length
  if (password.length < 6) {
    res.status(400).send({
      message: 'Password should be at least 6 characters'
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exists
        res.status(400).send({
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
              res.status(200).send({
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
      return res.status(400).send({ message: 'Email is not registered' });
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
        return res.status(400).send({ message: 'Incorrect password' });
      }
    });
  });
});

// Login by token
router.post('/login/auth', auth, (req, res) => {
  User.findById(req.body.userId).then(user => {
    if (!user) return res.statas(400).send({ message: 'No user logged In!' });
    res.send({
      error: 0,
      loggedInUser: user,
      message: 'this user authenticated'
    });
  });
});

//update user with auth authentication
router.put('/updateuser/:id', auth, async (req, res) => {
  const newData = req.body;
  let id = req.params.id;
  let newUpdate;
  await User.findById({ _id: id }, (err, user) => {
    if (err) throw err;
    user.firstName = newData.firstName;
    user.lastName = newData.lastName;
    user.about = newData.about;
    user.country = newData.country;
    user.city = newData.city;
    user.zip = newData.zip;
    user.phone = newData.phone;
    // console.log(user);
    user.save((err, doc) => {
      // console.log('updated user', doc);
      if (err) throw err;
      res.send({ error: 0, message: 'successfuly update', newData: doc });
    });
  });
});

// Logout Handle
router.get('/logout', (req, res) => {
  res.send({ error: 0, message: 'You are loged out' });
});

module.exports = router;
