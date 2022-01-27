const express = require('express');
const mongoose = require('mongoose');
const Message = require('../schemaModel/messageModel');
const randomstring = require('randomstring');
const auth = require('../middleware/auth');
const router = express.Router();

// adding message into dataBase looking for the
// sender, reciever and the item if there is
// conversation opened then using the conversationPort
// else create one by randomstring.generate
router.post('/message', auth, async (req, res) => {
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
      // conversationPort exist
      var conversationPort = messages[0].conversationPort;
    } else {
      // here to create conversationPort
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
      res.send({ error: 0, message: newDoc });
    });
  });
});

//=============================================
// to get all last messages from different users to show them in
// a list showing the sender, time, date and part of the message,

router.get('/conversationitems/:id', auth, async (req, res) => {
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
    return res.send({ error: 0, documents: docs });
  });
});

//==============================================
// Loading all messages has been sent from one conversation port
// get the sender name, reciever name and item name by populate.
router.get('/load/dialogue/:port', auth, async (req, res) => {
  await Message.findOne({ conversationPort: req.params.port })
    .populate('fromUserId', 'firstName')
    .populate('toUserId', 'firstName')
    .populate('itemId', 'name imageUrl active')
    .exec((error, usersNames) => {
      if (error) throw error;
      Message.find({ conversationPort: req.params.port }, (err, docs) => {
        res.send({ error: 0, documents: docs, users: usersNames });
      });
    });
});

module.exports = router;
