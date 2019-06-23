const express = require('express');
const appConfig = require('../config');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const items = require('./routes/items');
const fileUpload = require('express-fileupload');
const app = express();

// check if jwtPrivateKey exported
// if you get an error please export your jwtPrivateKey
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// cors options
const corsOptions = {
  origin: appConfig.host,
  optionsSuccessStatus: 200,
  credentials: true
};

mongoose
  .connect('mongodb://localhost/item_list', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// cors middleware
app.use(cors(corsOptions));

// to extend the req.body limit size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// file upload middleware
app.use(fileUpload());

app.use(express.json());
app.use('/api/user', users);
app.use('/api/items', items);
// app.use('/messages', messages);

const port = config.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
