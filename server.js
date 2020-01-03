const express = require("express");
const router = require("express").Router();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var session = require('express-session')

// ssr
import {serverRenderer} from './controllers/serverSideRendering';

//logs
app.use(morgan("dev"));

//use sessions for tracking logins
app.use(session({ 
  name:'__id',
  secret: 'keyboard cat',
  cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24},
  resave: true,
  saveUninitialized: true
}));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ssr
router.use("^/$", serverRenderer)

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.resolve(__dirname, 'client/build'), { maxAge: '30d' }));
}
// router.use(express.static("client/build", { maxAge: '30d' }));

// Add router (ssr and static)
app.use(router);
// Add API and view routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-auth",{   useCreateIndex: true,
useUnifiedTopology: true, useNewUrlParser: true});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!  ${process.env.cpuCore ? "on CPU " + process.env.cpuCore : "" }`);
});
