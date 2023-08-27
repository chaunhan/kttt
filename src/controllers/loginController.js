const User = require('../models/user');
const logins = require('../models/login')
const bcrypt = require('bcrypt');
require('dotenv/config');

const dangnhap = (req, res) => {
    res.render('./login/dangnhap.ejs');
}

const login = async (req,res) => {
    // try {
    //     const check = await User.findOne({ email: req.body.email });
    //     console.log(check.pass);
    //     console.log(req.body.pass);
    //     if (check.pass != "") {
    //         const comparePassword = bcrypt.compareSync(check.pass, req.body.pass)
    //         console.log(comparePassword)
    //         if (!comparePassword) {
    //                 req.session.loggedin = true;
    //                 req.session.user = user;
    //                 res.redirect('/home');
    //             } else {
    //                 const conflictError = 'LỖI';
    //                 res.render('./login/dangnhap.ejs', {email: req.body.email, pass : req.body.pass, conflictError});
    //             }
    //         console.log("dn tc");
    //         const s = new logins(req.body);
    //     try {
    //         await s.save();
    //         console.log("UserData: " , s);
    //         console.log("da lưu log");
    //     } catch (error) {
    //         res.status(500).send(error);
    //         console.log(error);
    //     }
    //     }else {
    //     console.log("null");
    //     }
    // } catch (err) {
    //     console.log("that bai ", err);
    // }
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