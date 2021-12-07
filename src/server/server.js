const express = require('express');
const appConfig = require('../config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const items = require('./routes/items');
const messages = require('./routes/messages');
const fileUpload = require('express-fileupload');
const error = require('./error');
const app = express();

// check if jwtPrivateKey exported
if (!appConfig.jwtPrivateKey || appConfig.jwtPrivateKey === '') {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// check if passwordMailSender exported
if (!appConfig.passwordMailSender || appConfig.passwordMailSender === '') {
  console.error('FATAL ERROR: passwordMailSender is not defined.');
  process.exit(1);
}

// cors options
const corsOptions = {
  origin: appConfig.host,
  optionsSuccessStatus: 200,
  credentials: true,
};

mongoose
  .connect(
    'mongodb://localhost/item_list',
    {
      // useUnifiedTopology: true,
      useNewUrlParser: true,
      user: 'username',
      pass: 'password',
    }
  )
  .then(() => {
    console.log('Successfuly connected to MongoDB...');
  })
  .catch((err) => {
    console.log('Could not connect to MongoDB...');
    process.exit();
  });

// cors middleware
app.use(cors(corsOptions));

// to extend the req.body limit size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// file upload middleware
app.use(fileUpload());

app.use(express.json());

// error handler
app.use(error);

// routes middlewares
app.use('/api/user', users);
app.use('/api/items', items);
app.use('/api/messages', messages);

const port = appConfig.PORT || 8080;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
