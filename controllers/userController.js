const db = require("../models");

// Defining methods for the booksController
module.exports = {

  create: function (req, res) {
    //validate request
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
      //create data
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }
      db.User
        .create(userData)
        .then(dbModel => {
          // setting the client cookie
          res.cookie("userId", dbModel._id, { expires: new Date(Date.now() + 900000), httpOnly: false })
          // set the session
          req.session.userId = dbModel._id;
          return res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },

  login: function (req, res, next) {
    console.log("login");

    //validate request
    if (req.body.email && req.body.password) {
      db.User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          console.log(`login: `, user._id);
          res.cookie("userId", user._id, { expires: new Date(Date.now() + 900000), httpOnly: false })
          req.session.userId = user._id;
          return next();
          return res.redirect('/api/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },
  
  authenticate: function( req, res, next){
    console.log("inside auth");
    console.log(`req.session ${JSON.stringify(req.session, null, 4)}`);
    db.User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.cookie.maxAge = 0;
          return res.json('Not authorized! Go back!');
        } else {
          res.cookie.maxAge = 1000 * 60 * 60; 
          return res.json(true);
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
  }
};
