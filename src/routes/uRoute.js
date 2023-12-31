var express = require('express');
var umodel = require('../models/user');
var login = require('../models/login');
var authMiddleware = require('../middlewares/auth.middlewares')
const router = express.Router();

router.get("/user/edit/:id", authMiddleware.Adminloggedin , async function (req, res) {
    console.log(req.params.id);
    await umodel.findById(req.params.id).then((user) => {
        if (user) {
            console.log(user);
            res.render("./login/updateUser.ejs", {
            user: user.toJSON(),
          });
        } else {
          console.log("loi");
        }
    });
});

router.post('/user/edit/:id', async (req,res) => {
    const s = (req.body);
    console.log("sdsad ",s);
    try {
        const a =  await umodel.findByIdAndUpdate(req.params.id,
            s);
    console.log("A",a);

    res.redirect('/userlist')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

router.get("/user/delete/:id", authMiddleware.Adminloggedin , async (req,res) => {
    try {
        const u= await umodel.findByIdAndDelete(req.params.id, req.body)
        if(!u){
            res.send("ko có user này")
        }else{
            res.redirect('/userlist')
            console.log("đã xóa");
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports=router;