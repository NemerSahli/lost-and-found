const express = require('express');
const User = require('../schemaModel/userModel');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
const randomString = require('randomstring');
const mailSender = require('./../mailHandler/mailSender');
const config = require('../../config.json');

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

//update user by passing id as params in request
router.put('/updateuser/:id', auth, async (req, res) => {
  const newData = req.body;
  await User.findById({ _id: req.params.id }, (err, user) => {
    if (err) throw err;
    user.firstName = newData.firstName;
    user.lastName = newData.lastName;
    user.about = newData.about;
    user.country = newData.country;
    user.city = newData.city;
    user.zip = newData.zip;
    user.phone = newData.phone;
    user.save((err, doc) => {
      if (err) throw err;
      res.send({ error: 0, message: 'successfuly update', newData: doc });
    });
  });
});

router.post('/forget/password/', async (req, res) => {
  if (!req.body.email)
    return res.status(400).send({ message: 'Email is required!' });

  let userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail) return res.status(400).send({ message: 'Email not found!' });
  let resetPasswordKey = randomString.generate(25);
  userEmail.resetPasswordKey = resetPasswordKey;

  await userEmail.save();

  let mailBody = `<h3>Fuburo Das online lost and found</h3>
                  <p>You recieved this email to reset your password</p> 
                  <p>please click on the link</p>
                  <a href="${config.host}/resetpass?q=${resetPasswordKey}">
                    ${config.host}/resetpass?q=${resetPasswordKey}
                  </a>`;

  await mailSender.sendMail(
    req.body.email,
    'no reply, Fuburo Reset Password',
    mailBody,
    res
  );
});

// Logout Handle
router.get('/logout', (req, res) => {
  res.send({ error: 0, message: 'You are loged out' });
});

router.post('/resetpass', async (req, res) => {
  if (!req.body.resetPasswordKey && !req.body.password)
    return res.send({
      error: 400,
      message:
        'password and the password key form the link in your email are required!'
    });
  let user = await User.findOne({
    resetPasswordKey: req.body.resetPasswordKey
  });
  if (!user)
    return res.send({
      error: 400,
      message: 'not able to get this user wrong link from your email!'
    });

  // Hash Password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      // Set password to hashed
      user.password = hash;
      // Save user
      user.save().then(user => {
        res.status(200).send({
          error: 0,
          message: 'Your password has been reseted successfuly!'
        });
      });
    })
  );
});

module.exports = router;
