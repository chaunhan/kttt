const cmodel = require("../models/course");
const umodel = require("../models/user");
const authMiddleware = require("../middlewares/auth.middlewares");

const admin =  async (req,res) => {
    res.render("./login/admin.ejs", {
    });
}
const home = async (req,res) => {
    const user = req.session.user;
    console.log(user.ten)
    cmodel.find({}).then((sp_ar) => {
        res.render('./home/home.ejs' , {
            sp_ar : sp_ar.map(s=>s.toJSON()),
            user : user,
        })
    });
}

const userlist = async (req, res) => {
    umodel.find({}).then((user_ar) => {
        res.render('./login/userlist.ejs' , {
            user_ar : user_ar.map(s=>s.toJSON()),
        })
    });
}

const index = async (req, res) => {
    cmodel.find({}).then((sp_ar) => {
        res.render('./index/index.ejs' , {
            sp_ar : sp_ar.map(s=>s.toJSON()),
        })
    });
}


module.exports = {
    admin,
    home,
    userlist,
    index
}