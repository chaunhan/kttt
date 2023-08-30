const User = require('../models/user');
const logins = require('../models/login')
const bcrypt = require('bcrypt');
require('dotenv/config');

const dangnhap = (req, res) => {
    conflictError = null;
    res.render('./login/dangnhap.ejs', conflictError);
}

const login = async (req,res) => {
    const { email, pass} = req.body;

    if (email && pass) {
        const check = await User.findOne({ email: email});
        if(check === null) {
            const conflictError = 'Sai tài khoản hoặc mật khẩu.';
            res.render('./login/dangnhap.ejs', { email, pass, conflictError});
        } else {
        const comparePassword = bcrypt.compareSync(pass, check.pass);
        console.log(comparePassword , "asd")
                if (comparePassword == true) {
                    req.session.loggedin = true;
                    req.session.user = check;
                    res.redirect('/home');
                } else {
                    const conflictError = 'Sai tài khoản hoặc mật khẩu.';
                    res.render('./login/dangnhap.ejs', {email, pass, conflictError});
                }
        }
    } else {
        const conflictError = 'Sai tài khoản hoặc mật khẩu.';
        res.render('./login/dangnhap.ejs', { email, pass, conflictError});
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) res.redirect("/");
        res.redirect("/");
    })
}
module.exports = {
    dangnhap,
    login,
    logout
}