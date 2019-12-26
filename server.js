const express = require("express");
const router = require("express").Router();
const ReactDOM = require( "react-dom");

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var session = require('express-session')
var MemoryStore = require('memorystore')(session)
var store =  new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
})
// ssr
const React = require('react')
const ReactDOMServer = require('react-dom/server')

// const App = require('./client/src/index');

//logs
app.use(morgan("dev"));

//use sessions for tracking logins
app.use(session({ 
  secret: 'keyboard cat',
  store: store,
  cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24} 
}));


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // ssr
// const serverRenderer = (req, res, next) => {

//   fs.readFile(path.resolve('./client/build/index.html'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return res.status(500).send('An error occurred')
//     }
//     console.log("\n\n\nssr")
//     console.log(ReactDOMServer.renderToString(<App />));
//     return res.send(
//       data.replace(
//         '<div id="root"></div>',
//         `<div id="root">${ReactDOMServer.renderToString()}</div>`
//       )
//     )
//   })
// }
// app.use('/', serverRenderer)


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"), { maxAge: '30d' });
}
// app.use(express.static("client/build", { maxAge: '30d' }));

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-auth");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
