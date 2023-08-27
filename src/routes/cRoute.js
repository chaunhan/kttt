var express = require('express');
const router = express.Router();
var cmodel = require('../models/course');
var app=express();

router.get("/khoahoc", (req,res) => {
    cmodel.find({}).then((sp_ar) => {
        res.render('./course/listcourse.hbs' , {
            sp_ar : sp_ar.map(s=>s.toJSON()),
        })
    });
});
app.get("/splist", (req,res) => {
    cmodel.find({}).then((sp_ar) => {
        res.render('splist1.hbs' , {
            sp_ar : sp_ar.map(s=>s.toJSON()),
        })
    });
})
router.post('/themc',  async (req,res) => {
    const s = new cmodel(req.body);
    try {
        await s.save();
        console.log("UserData: " , s);
        console.log("da them");
        res.send("Da them")
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});
app.get("/edit/:id", async (req, res) => {
    
    const doc = await cmodel.findById(req.params.id);
    console.log(doc);
    if(doc) {
        res.render("updateSP.hbs", { sp_ar: doc.toJSON() });
    }else {
        console.log("loi");
    }
});
app.post('/edit/:id', async (req,res) => {
    const s = (req.body);
    console.log("sdsad ",s);
    try {
       const a =  await cmodel.findByIdAndUpdate(req.params.id,
            s);
    console.log("A",a);

    res.redirect('/viewSP/')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});
    // await spmodel.findById(req.params.id).then((sp_ar) => {
    //     if (sp_ar) {
    //         console.log(sp_ar);
    //         res.render("updateSP.hbs", {
    //         sp_ar: sp_ar.toJSON(),
    //       });
    //     } else {
    //       console.log("loi");
    //     }
    //   });
    // });
app.get("/delete/:id" , async (req,res) => {
    try {
        const u= await cmodel.findByIdAndDelete(req.params.id, req.body)
        console.log(u);
        if(!u){
            res.send("ko có sp này")
        }else{
            res.redirect('/viewSP/');
            console.log("đã xóa");
        }
    } catch (error) {
        console.log(error);
    }
});


app.post("/tksp", (req,res) => {
    cmodel.find({TenSP: {'$regex': req.body.timkiem_home, '$option':'i' } }).then((sp_ar) => {
        res.render("findSp.hbs", {
            sp_ar: sp_ar.map((u) => u.toJSON()),
            dem: sp_ar.length,
        });
        console.log(sp_ar);
    });
});
module.exports= router;