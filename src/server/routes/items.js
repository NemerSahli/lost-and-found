const express = require('express');
const randomstring = require('randomstring');
const ImageDataURI = require('image-data-uri');
const fs = require('fs');
const Item = require('../schemaModel/itemModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

const config = require('../../config');

var path = '';
if (config.mode === 'production') {
  path = '../../public/images/';
} else {
  path = './public/images/';
}

router.get('/', [auth, admin], (req, res) => {
  res.send({
    message: 'Items API success in Fuburo App'
  });
});

router.get('/itemList', (req, res) => {
  Item.find({}, (err, items) => {
    if (err)
      res.status(400).send({ message: 'could not get items from database...' });
    res.send({ error: 0, items: items });
  });
});

// add item either its lost or fontLanguageOverride
router.post('/add/item', auth, async (req, res) => {
  var newItem = new Item(req.body);
  var imageData = req.body.image;

  // to check the image if there is url or its data base64
  if (imageData && imageData.length > 50) {
    const fileName = randomstring.generate(10) + '.png';
    ImageDataURI.outputFile(imageData, path + fileName);
    newItem.imageUrl = fileName;
  } else {
    newItem.imageUrl = imageData;
  }
  await newItem.save(err => {
    if (err) return res.send(err);
    res.send({ error: 0, item: newItem });
  });
});

router.post('/add/lost/item', async (req, res) => {
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

  var newItem = new Item(JSON.parse(req.body.newItem[0]));

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

router.get('/my/items/:id', auth, async (req, res) => {
  if (!req.params.id) {
    return res.send({ error: 1000, message: 'id is required!' });
  }

  await Item.find({ userId: req.params.id }, (err, docs) => {
    if (err) return res.send(err);
    return res.send({ items: docs });
  });
});

module.exports = router;
