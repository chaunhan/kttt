const authMiddleware = require("../middlewares/auth.middlewares");
const User = require('../models/user');


const create = (req,res) => {
    res.render('./ctv/index.ejs', {user: req.session.user});
}


module.exports = {
    create
}