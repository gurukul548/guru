exports.aboutPage = (req,res,next) =>{
    res.render('viewer/about',{
        pageTitle: "About",
        isAuthenticated: req.session.isLoggedIn
    });

}