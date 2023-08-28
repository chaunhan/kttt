const cmodel = require("../models/course");
const umodel = require("../models/user");
const authMiddleware = require("../middlewares/auth.middlewares");

const admin =  async (req,res) => {
    res.render("./login/admin.ejs", {
    });
}
const home = async (req,res) => {
    const user = req.session.user;
    console.log(user)
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

const profile = async (req,res) => {
    console.log(req.body)
    await umodel.findById(req.session.user._id).then((user) => {
        if (user) {
            console.log(user);
            res.render("./login/profile.ejs", {
            user: user.toJSON(),
          });
        } else {
          console.log("loi");
        }
      });
}

const updateprofile = async (req, res) => {
    const {_id, ten, address, sex, phone} = (req.body);
    console.log(req.body, "reqbody")
    try {
        const s = ({
            _id: _id,
            ten: ten,
            address: address,
            sex: sex,
            phone: phone
        })
        console.log(s, "data")
        const a =  await umodel.findByIdAndUpdate(req.session.user._id,
            s);
    console.log("A",a);

    res.redirect('/profile')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}


module.exports = {
    admin,
    home,
    userlist,
    index,
    profile,
    updateprofile,

}