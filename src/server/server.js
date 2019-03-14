const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const Item = require('./schemaModel/itemModel');
const Message = require('./schemaModel/messageModel');
const User = require('./schemaModel/userModel');
const error = require('./error');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
// const { ensureAutenticated } = require('./config/auth');
const cors = require('cors');
const randomstring = require('randomstring');
const ImageDataURI = require('image-data-uri');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const config = require('../config');

var path = '';
if (config.mode === 'production') {
  path = '../../public/images/';
} else {
  path = './public/images/';
}

// Passport config
// require('./config/passport')(passport);

// Connect to Mongo
mongoose
  .connect('mongodb://localhost:27017/item_list', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('err:', err));

const app = express();

const corsOptions = {
  origin: config.host,
  optionsSuccessStatus: 200,
  credentials: true
};
// cors middleware
app.use(cors(corsOptions));

// to extend the req.body limit size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(cors(corsOptions));
let loggedInUser = '';

// authentication function
const auth = (req, res, next) => {
  console.log(req.session);
  console.log(req.session);

  if (req.session && req.session.user === loggedInUser && req.session.admin) {
    console.log('wowww....');
    return next();
  } else {
    return res.sendStatus(401);
  }
};

// file upload middleware
app.use(fileUpload());

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use(
  session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
  })
);

// Async Error Handle
app.use(error);

app.get('/', (req, res) => {
  res.json({ info: 'lost&found version1.0' });
});

// Register Handle
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check required fields
  if (!firstName || !lastName || !email || !password) {
    res.send({
      error: 1000,
      message: 'All information are requiered'
    });
  }

  // Check pass length
  if (password.length < 6) {
    res.send({
      error: 1001,
      message: 'Password should be at least 6 characters'
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exists
        res.send({
          error: 1002,
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
app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  // passport.authenticate('local', {
  //   successRedirect: '/loginuser',
  //   failureRedirect: '/'
  // })(req, res, next);
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.send({ error: 1000, message: 'That email is not registered' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        loggedInUser = email;
        req.session.user = loggedInUser;
        req.session.admin = true;

        return res.send({ error: 0, loggedInUser: user });
      } else {
        return res.send({ error: 1001, message: 'Incorrect password' });
      }
    });
  });
});

// Logout Handle
app.get('/logout', (req, res) => {
  // req.logout();
  res.send({ error: 0, message: 'You are loged out' });
});

// add item either its lost or fontLanguageOverride
app.post('/addItem', async (req, res) => {
  var newItem = new Item(req.body);
  var imageData = req.body.image;

  // to check the image if there is url or its data base64
  if (imageData && imageData.length > 50) {
    const fileName = randomstring.generate(10) + '.png';
    // console.log('Path', path);
    // console.log('fileName', fileName);
    ImageDataURI.outputFile(imageData, path + fileName);
    // console.log('image decoding ... ...');
    newItem.imageUrl = fileName;
  } else {
    newItem.imageUrl = imageData;
  }
  await newItem.save(err => {
    if (err) return res.send(err);
    return res.send({ error: 0, item: newItem });
  });
});

app.post('/add/lost/item', async (req, res) => {
  // console.log(req.files);
  // console.log(req.body);

  var imageUrl = '';
  if (Object.keys(req.files).length == 0) {
    imageUrl = 'No_Image_Available.jpg';
    // console.log('if default', imageUrl);
  } else {
    let newImage = req.files.imageFile;
    if (
      newImage.mimetype !== 'image/png' &&
      newImage.mimetype !== 'image/jpeg' &&
      newImage.mimetype !== 'image/gif'
    ) {
      return res.send({ error: 'only files with extention: png, gif, jpeg' });
    }
    let imageName = newImage.name.split('.');
    let imageExtention = imageName[imageName.length - 1];
    imageUrl = randomstring.generate(10) + '.' + imageExtention;

    fs.writeFileSync(path + imageUrl, newImage.data, err => {
      if (err) return res.status(500).send(err);
    });
  }

  var newItem = new Item(JSON.parse(req.body.newItem));

  newItem.imageUrl = imageUrl;
  // console.log('imageUrl', newItem.imageUrl);
  await newItem.save(err => {
    if (err) return res.send(err);
    return res.send({ error: 0, item: newItem });
  });
  // newImage.mv('./public/images/' + newImage.name, function(err) {
  //   if (err) return res.status(500).send(err);
  //   return res.send({ message: 'thank you for your image' });
  // });
});

app.get('/itemList', async (req, res) => {
  await Item.find({}, (err, docs) => {
    if (err) return res.send(err);
    return res.send({ items: docs });
  });
});

app.get('/items/:id', async (req, res) => {
  if (!req.params.id) {
    return res.send({ error: 1000, message: 'id is required!' });
  }

  await Item.find({ userId: req.params.id }, (err, docs) => {
    if (err) return res.send(err);
    return res.send({ items: docs });
  });
});

app.put('/updateuser/:id', async (req, res) => {
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

//this part added for testing the request to post message
// to add a message into dataBase looking for the
// sender, reciever and the item if there is
// convesation opened then using the convesationPort
// else create one by randomstring.generate
app.post('/message', async (req, res) => {
  let query = {
    //here the condition of both users and the item
    $or: [
      {
        $and: [
          { fromUserId: req.body.fromUserId },
          { toUserId: req.body.toUserId },
          { itemId: req.body.itemId }
        ]
      },
      {
        $and: [
          { fromUserId: req.body.toUserId },
          { toUserId: req.body.fromUserId },
          { itemId: req.body.itemId }
        ]
      }
    ]
  };
  // here to find if there is conversationPort exist
  await Message.find(query, (err, messages) => {
    if (messages.length !== 0) {
      // console.log('conversationPort exist');
      var conversationPort = messages[0].conversationPort;
    } else {
      // here to create conversationPort
      // console.log('no conversationPort, creation one ...');
      var conversationPort = randomstring.generate(10);
    }
    let newMessage = new Message({
      // to add the conversationPort to the message
      ...req.body,
      conversationPort: conversationPort
    });
    newMessage.save((err, newDoc) => {
      // saving the message
      if (err) return res.send(err);
      return res.send({ error: 0, message: newDoc });
    });
  });
});

//=============================================
// to get all last messages from different users to show them in
// a list showing the sender, time, date and part of the message,
//
app.get('/conversationitems/:id', async (req, res) => {
  await Message.aggregate([
    {
      $match: {
        // to get all messages i sent or recieved
        $or: [
          { fromUserId: mongoose.Types.ObjectId(req.params.id) },
          { toUserId: mongoose.Types.ObjectId(req.params.id) }
        ]
      }
    },
    {
      // get a unique conversationPort has been added while posting the message
      // then to get the last one of these messages of different senders
      $group: {
        _id: '$conversationPort',
        fromUserId: { $last: '$fromUserId' },
        toUserId: { $last: '$toUserId' },
        itemId: { $last: '$itemId' },
        messageContent: { $last: '$messageContent' },
        date: { $last: '$date' }
      }
    },
    {
      // to join the message obj and the user sender obj
      $lookup: {
        from: 'users',
        localField: 'fromUserId',
        foreignField: '_id',
        as: 'fromUser'
      }
    },
    {
      // to join the message obj and the user reciever obj
      $lookup: {
        from: 'users',
        localField: 'toUserId',
        foreignField: '_id',
        as: 'toUser'
      }
    },
    {
      // to join the message obj and the item obj
      $lookup: {
        from: 'items',
        localField: 'itemId',
        foreignField: '_id',
        as: 'item'
      }
    },
    {
      // to ignore all the un neccessary info joned from item
      $project: {
        'item._id': 0,
        'item.time': 0,
        'item.comment': 0,
        'item.location': 0,
        'item.lnglat': 0,
        'item.image': 0,
        'item.userId': 0,
        'item.tags': 0,
        'item.__v': 0
      }
    },
    {
      // to ignore all the un neccessary info joned from user sender the message
      $project: {
        'fromUser._id': 0,
        'fromUser.lastName': 0,
        'fromUser.email': 0,
        'fromUser.password': 0,
        'fromUser.registrationDate': 0,
        'fromUser.__v': 0
      }
    },
    {
      // to ignore all the un neccessary info joned from user receiver the message
      $project: {
        'toUser._id': 0,
        'toUser.lastName': 0,
        'toUser.email': 0,
        'toUser.password': 0,
        'toUser.registrationDate': 0,
        'toUser.__v': 0
      }
    }
  ]).exec((error, docs) => {
    if (error) throw error;
    // console.log(JSON.stringify(docs, null, '\t'));
    return res.send({ error: 0, documents: docs });
  });
});

//==============================================
// Loading all messages has been sent from one convesation port
// get the sender name, reciever name and item name by populate.
app.get('/load/dialogue/messages/:port', async (req, res) => {
  await Message.findOne({ conversationPort: req.params.port })
    .populate('fromUserId', 'firstName')
    .populate('toUserId', 'firstName')
    .populate('itemId', 'name imageUrl')
    .exec((error, usersNames) => {
      if (error) throw error;
      // console.log(JSON.stringify(usersNames, null, '\t'));

      Message.find({ conversationPort: req.params.port }, (err, docs) => {
        res.send({ error: 0, documents: docs, users: usersNames });
      });
    });
});

//==============================================
// search for either place, keywords or together
// defined queries to path them into
// mongoose schema find method
app.get('/search', async (req, res) => {
  //looking for
  if (req.query.p) {
    var location = req.query.p;
  }
  if (req.query.k) {
    var keyWord = req.query.k;
  }

  if (!location && !keyWord) {
    return res.send({ error: 1, message: 'Your search result is: 0 items' });
  }

  if (location && !keyWord) {
    var query = { location: new RegExp(location, 'i') };
    // console.log('only location=', location);
  } else if (!location && keyWord) {
    var query = {
      $or: [
        { name: new RegExp(keyWord, 'i') },
        { tags: new RegExp(keyWord, 'i') },
        { comment: new RegExp(keyWord, 'i') },
        { category: new RegExp(keyWord, 'i') }
      ]
    };
    // console.log('only keyWord=', keyWord);
  } else if (location && keyWord) {
    // console.log('location=', location, '\n', 'keyWord', keyWord);
    var query = {
      $and: [
        { location: new RegExp(req.query.p, 'i') },
        {
          $or: [
            { name: new RegExp(keyWord, 'i') },
            { comment: new RegExp(keyWord, 'i') },
            { category: new RegExp(keyWord, 'i') }
          ]
        }
      ]
    };
  }

  await Item.find(query, (err, documents) => {
    if (err) return res.send(err);
    if (documents.length > 0) {
      return res.send({ error: 0, documents: documents });
    } else {
      return res.send({ error: 1, message: 'Your search result is: 0 items' });
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app listening on port ${port}...`));
