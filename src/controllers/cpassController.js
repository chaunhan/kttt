const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv/config');


const create = (req, res) => {
    res.render('./login/changepass.ejs');
}

const changepass = async (req, res) => {
    const {_id, pass, newpass} = (req.body);
    console.log(req.body, "reqbody")
    const comparePassword = bcrypt.compareSync(pass, req.session.user.pass);
    if(comparePassword == true) {
        try {
            bcrypt.hash(newpass, parseInt(process.env.BCRYPT_SALT_ROUND)).then(async (hashed) => {
                // Tạo người dùng
                const s = ({
                    pass: hashed,
                });
            console.log(s, "data")
            const a =  await User.findByIdAndUpdate(req.session.user._id,
                s);
            console.log("A",a);
            res.redirect('/changepassword')
            })
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    } else{
        res.send("sai mat khau cu")
    }
}

module.exports = {
    create,
    changepass,

}