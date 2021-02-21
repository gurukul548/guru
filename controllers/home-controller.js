exports.homePage = (req,res,next) =>{
    res.render('viewer/home',{
        pageTitle: "Home",
        isAuthenticated: req.session.isLoggedIn
    });
}