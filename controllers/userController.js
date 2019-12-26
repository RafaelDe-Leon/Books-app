const db = require("../models");
var session = require('express-session')

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
          console.log('redirect');
          return res.redirect('/books');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },

  authenticate: function( req, res, next){
    console.log(`req.session ${JSON.stringify(req.session, null, 4)}`);
    // req.session.cookie = {}
    db.User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          req.session.destroy(function(err){
            if (err) throw err;
            res.clearCookie("userId");
            res.clearCookie("connect.sid");
            return res.status(401).json('Not authorized! Go back!');

          });
        } else {
          res.cookie("userId", user._id, { expires: new Date(Date.now() + 900000), httpOnly: false })
          return res.status(200).json(user);
        }
      }
    });
  }
};
