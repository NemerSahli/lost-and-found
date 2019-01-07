const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./usermodel.js');
const Email = require('./emailmodel');
const mailSender = require('./mailSender');
const randomstring = require('randomstring');
const apiCrud = require('./controllers/apiCrud');

mongoose.connect('mongodb://localhost:27017/users_list');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
  })
);

app.use(cors(corsOptions));
let loggedInUser = '';

const auth = (req, res, next) => {
  console.log(req.session.user);
  console.log(req.session.admin);

  if (req.session && req.session.user === loggedInUser && req.session.admin) {
    console.log('wowww....');
    return next();
  } else {
    return res.sendStatus(401);
  }
};

app.post('/login', (req, res) => {
  if (!req.body.userEmail || !req.body.password) {
    return res.send({ error: 1000, message: 'username and password required' });
  }

  Email.findOne({ userEmail: req.body.userEmail }, (err, dbres) => {
    if (err) {
      return res.send({ error: 1001, message: 'login failed' });
    }
    if (!dbres) {
      return res.send({
        error: 1000,
        message: 'Email not found or wrong password'
      });
    }
    bcrypt.compare(req.body.password, dbres.password, (error, result) => {
      if (error) res.send({ error: error });
      if (req.body.userEmail === dbres.userEmail && result) {
        loggedInUser = req.body.userEmail;
        req.session.user = loggedInUser;
        req.session.admin = true;
        dbres.save(err => {
          if (err) return res.send({ erroro: 1001, message: 'login failed' });
          return res.send({ error: 0, message: 'login successfull' });
        });
      } else {
        return res.send({
          error: 1000,
          message: 'Email not found or wrong password'
        });
      }
    });
  });
});

app.post('/signup', (req, res) => {
  if (!req.body.userEmail || !req.body.password) {
    return res.send({ error: 1000, message: 'username and password required' });
  }
  Email.findOne({ userEmail: req.body.userEmail }, (err, dbres) => {
    if (err) {
      return res.send({ error: 1001, message: 'signup failed' });
    }
    if (dbres) {
      return res.send({
        error: 1000,
        message: 'email exist, please enter another one.'
      });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassResult) => {
      if (err) return send.send({ err: err });
      console.log('Hashed password', hashedPassResult);

      let query = {
        userEmail: req.body.userEmail,
        password: hashedPassResult,
        activationKey: randomstring.generate(10),
        previousVisit: '',
        lastVisit: ''
      };

      let newEmail = new Email(query);
      newEmail.save(err => {
        if (err) {
          return res.send({ error: 1001, message: 'sign up failed' });
        }
        return res.send({ error: 0, message: 'sign up successfull' });
      });
    });
  });
});

app.post('/forgetpass', (req, res) => {
  if (!req.body.userEmail) {
    return res.send({ error: 1000, message: 'Email is required' });
  }

  Email.findOne({ userEmail: req.body.userEmail }, (err, dbres) => {
    if (err) {
      return res.send({ error: 1001, message: 'signup failed' });
    }
    if (!dbres) {
      return res.send({
        error: 1000,
        message: 'email not exit.'
      });
    }
    let mailBody = `<h3>You got this email to reset your password</h3>
                    <p>Please confirm to reset the password by click on the link below:</p>
                    <a href="http://localhost:3000/resetpass?q=${
                      dbres.activationKey
                    }">Reset password</a>
                    <p>yours sincerely</p>
                    <p>Nemer EL-Sahli</p>`;
    mailSender.sendMail(req.body.userEmail, 'Reset Password', mailBody);

    res.send({
      error: 0,
      message: 'please check your email to reset your passwrod'
    });
  });
});
app.post('/resetpass', (req, res) => {
  if (!req.body.activationKey || !req.body.password) {
    return res.send({
      error: 1000,
      message: 'new password required or wrong activationKey'
    });
  }
  Email.findOne({ activationKey: req.body.activationKey }, (err, dbres) => {
    if (err) {
      return res.send({ error: 1001, message: 'reset password failed' });
    }
    if (!dbres) {
      return res.send({
        error: 1000,
        message: 'email not exist.'
      });
    }
    //$2b$10$2C1mVrVcE8ioAPuT.aDVJev6fHilE5nT61JUTaF0ndV8mhyJPCAxW
    bcrypt.hash(req.body.password, 10, (err, hashedPassResult) => {
      if (err) return send.send({ err: err });
      console.log('Hashed password', hashedPassResult);

      dbres.password = hashedPassResult;

      dbres.save(err => {
        if (err) {
          return res.send({
            error: 1001,
            message: 'failed during save new password'
          });
        }
        return res.send({ error: 0, message: 'password reseted successfully' });
      });
    });
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  return res.send({ error: 0, message: 'logout successfull' });
  // res.redirect('/');
});

// apiCrud(app, auth, User);
app.get('/users', auth, (req, res) => {
  console.log('get users');

  User.find({}, function(err, users) {
    if (err) res.send({ error: err });
    res.send({ error: 0, message: 'users loaded!', users: users });
  });
});

app.post('/adduser', auth, (req, res) => {
  let newUserData = {
    username: req.body.username,
    email: req.body.email,
    city: req.body.city
  };

  let newUser = new User(newUserData);
  newUser.save(function(err, dbres) {
    if (err) return res.send(err);
    res.send({
      error: 0,
      message: 'new user has been added!',
      newUser: dbres
    });
  });
});

app.delete('/deleteuser/:id', auth, (req, res) => {
  let userId = req.params.id;
  User.deleteOne({ _id: userId }, (err, docs) => {
    if (err) return res.send({ error: err });
    res.send({ error: 0, message: 'user has been deleted!', userId: userId });
  });
});

app.put('/updateuser', auth, (req, res) => {
  let userId = req.body._id;
  console.log(userId);
  User.findOne({ _id: userId }, function(err, user) {
    console.log('user:', user);
    user.username = req.body.username;
    user.email = req.body.email;
    user.city = req.body.city;
    if (err) return res.send({ error: err });
    user.save(function(err, savedData) {
      if (err) res.send({ error: err });
      console.log(savedData);
      res.send({
        error: 0,
        message: 'This is the secret area and the user has been updated!',
        userId: userId
      });
    });
  });
});

app.listen(8000);
console.log('server run on port 8000');
