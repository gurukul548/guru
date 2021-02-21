const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: process.env.MAIL_KEY
  }
  }));

exports.getLoginPage = (req,res,next) =>{
  let Lmessage = req.flash("error");
  if (Lmessage.length > 0) {
    Lmessage = Lmessage[0];
  } else {
    Lmessage = null;
  }
  res.render("auth/login", {
    pageTitle: "GK Login",
    LerrorMessage: Lmessage,
    isAuthenticated: false
  });
};

exports.getSignupPage = (req,res,next) =>{
  let Smessage = req.flash("error");
  if (Smessage.length > 0) {
    Smessage = Smessage[0];
  } else {
    Smessage = null;
  }
  res.render("auth/signup", {
    pageTitle: "GK Signup",
    SerrorMessage: Smessage,
    isAuthenticated: false
  });
};

exports.postLogin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/auth/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              return res.redirect("/course");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/auth/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req,res,next) =>{
  const pname = req.body.pname;
  const sname = req.body.sname;
  const email = req.body.email;
  const pno = req.body.pno;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const standard = req.body.standard;
  const course = req.body.course;
  User.findOne({ email: email })
  .then((userDoc) => {
    if (userDoc) {
      req.flash(
        "error",
        "E-Mail exists already, please pick a different one."
      );
      return res.redirect("/auth/signup");
    } else if (password !== confirmPassword) {
      req.flash("error", "Passwords didn't match, please try again");
      return res.redirect("/auth/signup");
    }
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          pname: pname,
          sname: sname,
          email: email,
          pno: pno,
          password: hashedPassword,
          standard: standard,
          course: course
        });
        return user.save();
      })
      .then((result) => {
        res.redirect("/auth/login");
        return transporter.sendMail({
          to: email,
          from: "gurukul77777@gmail.com",
          subject: "Welcome to Gurukul Learn",
          html: "<h1>You successfully signed up!</h1>"
        });
      })
      .catch(err =>{
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};