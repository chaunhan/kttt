const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv/config');

const create = (req, res) => {
    res.render('./login/dangky.ejs');
}

const register = async (req,res) => {
    const { email, pass, ten , ref} = req.body;

    if (email && pass && ten && ref) {
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
                    res.redirect("/login")
            } catch (error) {
                console.log(error)
            }
        })
    } else {
        const conflictError = 'NGƯỜI DÙNG ĐÃ TỒN TẠI.';
    res.render('./login/dangky', { email, pass, ten, ref, conflictError});
    }
}

module.exports = {
    create,
    register,

}