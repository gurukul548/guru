exports.contactPage = (req,res,next) =>{
    res.render('viewer/contact',{
        pageTitle: "Contact",
        isAuthenticated: req.session.isLoggedIn
    });
}