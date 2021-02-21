const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const Enroll = require("../models/enroll");

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          process.env.MAIL_KEY
      }
    })
  );

exports.getCoursePage = (req,res,next) =>{
    res.render('viewer/course',{
        pageTitle: "Course",
        isAuthenticated: req.session.isLoggedIn
    });  
};

exports.getEnrollPage = (req,res,next) =>{
    res.render('viewer/enroll',{
        pageTitle: "Enroll",
        isAuthenticated: req.session.isLoggedIn
    });  
};

exports.postEnrollPage = (req,res,next) =>{
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const pno = req.body.pno;
  const address = req.body.address;
  const country = req.body.country;
  const state = req.body.state;
  const zip = req.body.zip;
  const course = req.body.course;
  const duration = req.body.duration;
  const enroll = new Enroll({
    fname: fname,
    lname: lname,
    email: email,
    pno: pno,
    address: address,
    country: country,
    state: state,
    zip: zip,
    course: course,
    duration: duration
  });
      return enroll
        .save()
        .then((result) => {
          res.redirect("/course");
          return transporter.sendMail({
            to: email,
            from: "gurukul77777@gmail.com",
            subject: "Thanks for enrolling for course",
            html: "<h1>We will contact you soon regarding course details!</h1>"
          });
        })
        .catch((err) => {
          console.log(err);
        });
};