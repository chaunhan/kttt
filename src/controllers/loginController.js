const User = require('../models/user');
const logins = require('../models/login')
const bcrypt = require('bcrypt');
require('dotenv/config');

const dangnhap = (req, res) => {
    res.render('./login/dangnhap.ejs');
}

const login = async (req,res) => {
    try {
        const { email, pass} = req.body;

    if (email && pass) {
        const check = await User.findOne({ email: email});
        console.log(check.pass);
        console.log(pass)
        const comparePassword = bcrypt.compareSync(pass, check.pass);
        console.log(comparePassword , "asd")
                if (comparePassword == true) {
                    req.session.loggedin = true;
                    req.session.user = check;
                    res.redirect('/home');
                } else {
                    const conflictError = 'LỖI';
                    res.render('./login/dangnhap.ejs', {email, pass, conflictError});
                }
        } else {
        const conflictError = 'NGƯỜI DÙNG ĐÃ TỒN TẠI.';
    res.render('./login/dangky', { email, pass, conflictError});
    }
    } catch (error) {
        console.log(error)
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