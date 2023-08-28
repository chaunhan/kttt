const authMiddleware = require("../middlewares/auth.middlewares");
const Course = require('../models/course');

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
    console.log(courseID);
    await Course.findOne({TenCourse : courseID}).then((course) => {
        console.log(course)
        res.render("./course/course-detail.ejs", {
            user: req.session.user,
            course: course
        })
      });
    
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

module.exports = {
    create,
    themCourse,
    trangEdit,
    edit,
    deleteCourse,
    courseDetail,
    courseDetail1
}