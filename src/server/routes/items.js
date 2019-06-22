const express = require('express');
const Item = require('../schemaModel/itemModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

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
router.post('/addItem', auth, async (req, res) => {
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

router.get('/my/items/:id', async (req, res) => {
  if (!req.params.id) {
    return res.send({ error: 1000, message: 'id is required!' });
  }

  await Item.find({ userId: req.params.id }, (err, docs) => {
    if (err) return res.send(err);
    return res.send({ items: docs });
  });
});


module.exports = router;
