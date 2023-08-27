var express = require('express');
var umodel = require('../models/user');
var login = require('../models/login');
const router = express.Router();

// router.get("/reg", (req,res) => {
//     res.render("./login/dangky.ejs");
// });
// router.post('/dangky', async (req,res) => {
//     const s = new umodel(req.body);
//     try {
//         await s.save();
//         console.log("UserData: " , s);
//         console.log("da them");
//         res.redirect("/dangnhap");
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error);
//     }
// });

router.get("/dangnhap", (req,res) => {
    res.render("./login/dangnhap.ejs");
});

// router.post("/login", async (req, res) => {
//     try {
//       const check = await umodel.findOne({ email: req.body.email });
//       console.log(check.pass);
//       console.log(req.body.pass);
//       if (check.pass != "") {
//         if (check.pass == req.body.pass) {
//           console.log("dn tc");
//            var ql = check.ten;
//         //   var splist = "List Sản Phẩm";
//         //    console.log(check.roles);
//         //   if (ql == "admin") ql = "Roles : ADMIN";
//         //   else ql = "";
//         // var login1 = "User : " + check.fullname;
//         //   var login = "Đăng xuất"
//           const s = new login(req.body);
//           try {
//               await s.save();
//               console.log("UserData: " , s);
//               console.log("da lưu log");
//           } catch (error) {
//               res.status(500).send(error);
//               console.log(error);
//           }
//           res.send("THANH CONG")
//         } else {
//           res.send("sai mk");
//         }
//       } else {
//         console.log("null");
//       }
//     } catch (err) {
//       console.log("that bai ", err);
//     }
//   });

router.get("/user/edit/:id", async function (req, res) {
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
router.get("/admin", async (req,res) => {
    res.render("./login/admin.ejs");
})
router.get("/user/delete/:id" , async (req,res) => {
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

router.get('/userlist', (req,res) => {
    umodel.find({}).then((user_ar) => {
        res.render('./login/userlist.ejs' , {
            user_ar : user_ar.map(s=>s.toJSON()),
        })
    });
});
module.exports=router;