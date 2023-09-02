exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        next();
    } else {
        res.redirect('/dangnhap')
    }
}

exports.Adminloggedin = (req, res, next) => {
    if (req.session.Adminloggedin) {
        res.locals.admin = req.session.admin
        next();
    } else {
        res.redirect('/admin/login')
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.session.Adminloggedin) {
        res.locals.admin = req.session.admin
        res.redirect('/admin');
    } else {
        next();
    }
} 

exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        res.redirect('/home');
    } else {
        next();
    }
} 