const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const Trial = require("../models/trial");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        process.env.MAIL_KEY
    }
  })
);

exports.getTrialPage = (req,res,next) =>{
    res.render('viewer/trial',{
        pageTitle: "GK Trial",
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postTrialPage = (req,res,next) =>{
  const pname = req.body.pname;
  const sname = req.body.sname;
  const email = req.body.email;
  const pno = req.body.pno;
  const standard = req.body.standard;
  const course = req.body.course;
  const trial = new Trial({
    pname: pname,
    sname: sname,
    email: email,
    pno: pno,
    standard: standard,
    course: course
  });
      return trial
        .save()
        .then((result) => {
          res.redirect("/");
          return transporter.sendMail({
            to: email,
            from: "gurukul77777@gmail.com",
            subject: "Thanks for applying for your free trial classes",
            html: "<h1>We will contact you soon!</h1>"
          });
        })
        .catch((err) => {
          console.log(err);
        });
};