const authMiddleware = require("../middlewares/auth.middlewares");
const Course = require('../models/course');
const User = require('../models/user');
const Cart = require('../models/cart');
const ReqMua = require('../models/reqmua')

const create = (req,res) => {
    Course.find({}).then((sp_ar) => {
        res.render('./course/listcourse.ejs' , {
            sp_ar : sp_ar.map(s=>s.toJSON()),
            user: req.session.user,
        })
    })
}

const themCourse = async (req,res) => {
    const s = new Course(req.body);
    try {
        await s.save();
        console.log("UserData: " , s);
        console.log("da them");
        res.send("Da them")
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const trangEdit = async (req,res) => {
    const doc = await Course.findById(req.params.id);
    console.log(doc);
    if(doc) {
        res.render("updateSP.hbs", { sp_ar: doc.toJSON() });
    }else {
        console.log("loi");
    }
}

const edit = async (req, res) => {
    const s = (req.body);
    console.log("sdsad ",s);
    try {
        const a =  await Course.findByIdAndUpdate(req.params.id,s);
    console.log("A",a);
    res.redirect('/khoahoc')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteCourse = async (req, res) => {
    try {
        const u= await Course.findByIdAndDelete(req.params.id, req.body)
        console.log(u);
        if(!u){
            res.send("ko có sp này")
        }else{
            res.redirect('/khoahoc');
            console.log("đã xóa");
        }
    } catch (error) {
        console.log(error);
    }
}

const courseDetail = async (req, res) => {
    const courseID = req.params.TenCourse
    const check = await User.findOne({email: req.session.user.email})
    if (check.cDaMua == courseID) {
        console.log(courseID);
        await Course.findOne({TenCourse : courseID}).then((course) => {
            console.log(course)
            res.render("./course/course-detail.ejs", {
                user: req.session.user,
                course: course
            })
          });
    } else {
        await Course.findOne({TenCourse : courseID}).then((course) => {
            console.log(course)
            res.render("./course/cdetail-unactice.ejs", {
                user: req.session.user,
                course: course
            })
          });
        
    }   
}

const courseDetail1 = async (req, res) => {
    const courseID = req.params.TenCourse
    console.log(courseID);
    await Course.findOne({TenCourse : courseID}).then((course) => {
        console.log(course)
        res.render("./course/cdetail.ejs", {
            user: req.session.user,
            course: course
        })
      });
    
}

let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const addcart = async (req,res) => {
    const info = new Cart({
        id : req.session.user._id,
        TenCourse : req.body.TenCourse,
        GiaCourse : req.body.GiaCourse
    })
    console.log(info)
    const tien = VND.format(info.GiaCourse)
    const cre = await Cart.create(info);
    try{
        cre
        res.render('./course/cart.ejs' ,{giatien: tien , user: req.session.user , info : info})
    } catch (e) {
        console.log(e)
    }
}

const muaCoure = async (req,res) => {
    const user = req.session.user 
    id = user._id

    res.render('./course/muaCourse.ejs', {user : user , id: id})
}
const guilenhMua = async (req,res) => {
    const {email , _id, GiaCourse , TenCourse, ten} = req.body
    console.log(email , _id, GiaCourse)
    const info = new ReqMua({
        email: email,
        id: _id,
        tien: GiaCourse,
        TenCourse: TenCourse,
        ten: ten
    })
    const cre = await ReqMua.create(info)
    try {
        cre
        res.redirect("/thanhtoan")
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    create,
    themCourse,
    trangEdit,
    edit,
    deleteCourse,
    courseDetail,
    courseDetail1,
    addcart,
    muaCoure,
    guilenhMua
}