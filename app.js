const express = require('express');

const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

const User = require("./models/user");

const MONGODB_URI = "mongodb+srv://GK_User:GK_User@gk-cluster.zckbh.mongodb.net/GKDB?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
  });
  
app.use(express.static(__dirname + '/public'));
  app.set("view engine", "ejs");
  app.set("views", "views");

const aboutRoutes = require('./routes/about');
const courseRoutes = require('./routes/course');
const homeRoutes = require('./routes/home');
const contactRoutes = require('./routes/contact');
const trialRoutes = require('./routes/trial');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/course',courseRoutes);
app.use('/about',aboutRoutes);
app.use('/contact',contactRoutes);
app.use('/auth', authRoutes);
app.use('/trial', trialRoutes);
app.use('/',homeRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("DB CONNECTED");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
