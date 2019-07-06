const express = require('express');
const randomstring = require('randomstring');
const ImageDataURI = require('image-data-uri');
const fs = require('fs');
const Item = require('../schemaModel/itemModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

const config = require('../../config');

// to define the proper path of the images
// will be either in develpment or production
var path = '';
if (config.mode === 'production') {
  path = '../../public/images/';
} else {
  path = './public/images/';
}

// this end point only to test auth and admin
router.get('/', [auth, admin], (req, res) => {
  res.send({
    message: 'Items API success in Fuburo App'
  });
});

// to get all items list
router.get('/itemList', (req, res) => {
  Item.find({ active: true }, (err, items) => {
    if (err)
      res.status(400).send({ message: 'could not get items from database...' });
    res.send({ error: 0, items: items });
  });
});

// add found item or lost if no image
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

// add lost item
router.post('/add/lost/item', auth, async (req, res) => {
  var imageUrl = '';
  if (Object.keys(req.files).length == 0) {
    imageUrl = 'No_Image_Available.jpg';
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
  await newItem.save(err => {
    if (err) return res.send(err);
    return res.send({ error: 0, item: newItem });
  });
  // newImage.mv('./public/images/' + newImage.name, function(err) {
  //   if (err) return res.status(500).send(err);
  //   return res.send({ message: 'thank you for your image' });
  // });
});

// get my items
router.get('/my/items/:id', auth, async (req, res) => {
  if (!req.params.id) {
    return res.send({ error: 1000, message: 'id is required!' });
  }

  await Item.find({ userId: req.params.id }, (err, docs) => {
    if (err) return res.send(err);
    return res.send({ items: docs });
  });
});

//==============================================
// search for either place, keywords or together
// defined queries to path them into
// mongoose schema find method
router.get('/search', async (req, res) => {
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
  } else if (!location && keyWord) {
    var query = {
      $or: [
        { name: new RegExp(keyWord, 'i') },
        { tags: new RegExp(keyWord, 'i') },
        { comment: new RegExp(keyWord, 'i') },
        { category: new RegExp(keyWord, 'i') }
      ]
    };
  } else if (location && keyWord) {
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

//==============================================
// stop item from the dashboard list view also
// stop messages for this item and my items list

router.put('/deactivate/:id', async (req, res) => {
  let item = await Item.findById(req.params.id);
  if (!item)
    return res.status(400).send({ message: 'no item found by this id' });
  item.active = false;
  await item.save();
  res.status(200).send({ message: 'your item has been deactivated!' });
});

// to activate all items just for testing purpose
router.put('/activate', async (req, res) => {
  await Item.updateMany({}, { active: true });
  res.send({ message: 'items has been activated!' });
});

module.exports = router;
