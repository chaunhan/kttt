const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv/config');

const create = (req, res) => {
    const conflictError = null;
    res.render('./login/dangky.ejs' , {conflictError: conflictError});
}

const register = async (req,res) => {
    const { email, pass, ten , ref} = req.body;

    if (email && pass && ten) {
        const check = await User.findOne({ email: email});
        check, (err, user) => {
            if ( err || user) {
                const conflictError = 'NGƯỜI DÙNG TỒN TẠI.';
                res.render('.login/register', { email, pass, ten, ref, conflictError})
            }
        }

        bcrypt.hash(pass, parseInt(process.env.BCRYPT_SALT_ROUND)).then(async (hashed) => {
            // Tạo người dùng
            const user = new User({
                ten: ten,
                email: email,
                pass: hashed,
                ref: ref
            });
            const s = new User(user);
            console.log(s)
            const cre = await User.create(s)
            try {
                cre
                    res.redirect("/dangnhap")
            } catch (error) {
                console.log(error)
            }
        })
    } else {
        const conflictError = 'Xin hãy nhập đầy đủ những thông tin như email, password và tên.';
    res.render('./login/dangky', { email, pass, ten, ref, conflictError});
    }
}

const regCoRef = (req, res) => {
    const conflictError = null;
    const ref = req.params.ref
    res.render('./login/dangkycoref.ejs' , {conflictError: conflictError, ref: ref});
}

module.exports = {
    create,
    register,
    regCoRef
}