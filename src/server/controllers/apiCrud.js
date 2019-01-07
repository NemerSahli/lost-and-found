module.exports = function(app, auth, User) {
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
};
