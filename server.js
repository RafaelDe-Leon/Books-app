const express = require("express");
const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var session = require('express-session')

// ssr
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './client/src/App';


//logs
app.use(morgan("dev"));

//use sessions for tracking logins
app.use(session({ 
  name:'__id',
  secret: 'keyboard cat',
  cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24} 
}));


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ssr
console.log(App);
const appComponent = ReactDOMServer.renderToString(<App ssr/>)
console.log(`appComponent: ${appComponent}`);

const serverRenderer = (req, res, next) => {

  fs.readFile(path.resolve('./client/build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    console.log("\n\n\nssr")
    // const app = ReactDOMServer.renderToString(<App />)
    console.log(`appComponent: ${appComponent}`);
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appComponent}</div>`
      )
    )
  })
}
router.use("^/$", serverRenderer)

// router.use(
//   express.static(path.resolve(__dirname, 'client/build'), { maxAge: '30d' })
// )
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  router.use(express.static("client/build"), { maxAge: '30d' });
}
// router.use(express.static("client/build", { maxAge: '30d' }));

// Add routes, both API and view
app.use(router);
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-auth");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
