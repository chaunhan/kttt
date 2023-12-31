
const reqWithdraw = require ('../models/reqRutTien')
const reqMua = require ('../models/reqmua')
const User = require('../models/user');
const Cart = require('../models/cart')
const Admin = require('../models/admin')
const authMiddleware = require("../middlewares/auth.middlewares");
const bcrypt = require('bcrypt');
const course = require('../models/course');
require('dotenv/config');


let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});


const create = (req,res) => {
    res.render("./login/admin.ejs");
}

const withdrawCpanel = async (req, res) => {
    reqWithdraw.find({}).then((request_ar) => {
        res.render('./admin/withdrawCpanel.ejs' , {
            request_ar : request_ar.map(s=>s.toJSON()),
        })
    });
}

const edit = async function (req, res) {
    console.log(req.params.id);
    
    await reqWithdraw.findById(req.params.id).then( async (request) => {
        if (request) {
            console.log(request);
            await User.findOne({email : request.email}).then((user) => {
                const tien = VND.format(user.tien)
                const tienrut = VND.format(request.tienrut)
                res.render("./admin/xetDuyetRutTien.ejs", {
                    request: request.toJSON(),
                    tien : tien,
                    tienrut: tienrut,
                    user: user
            })
        })
        } else {
        console.log("loi");
        }
    })
}

const editpost = async (req,res) => {
    const {isCheck, tienrut , email , tien} = (req.body);

    const doiTrangThaiTrue = ({
        isCheck: "true"
    })
    const doiTrangThaiHuy = ({
        isCheck: "cancelled"
    })
    if (isCheck == doiTrangThaiHuy.isCheck) {
        try {
            await reqWithdraw.findByIdAndUpdate(req.params.id,
                doiTrangThaiHuy);
        res.redirect('/admin/lenh-rut-tien')
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    }
    if (isCheck == doiTrangThaiTrue.isCheck) {
        try {
            await reqWithdraw.findByIdAndUpdate(req.params.id,
                doiTrangThaiTrue);
            const user = await User.findOne({email : email})
    
            const UpdateTien = ({
                tien: parseInt(tien) - parseInt(tienrut)
            })
            await User.findByIdAndUpdate(user._id, UpdateTien)
            res.redirect('/admin/lenh-rut-tien')
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    }
}


const checkMua = async (req, res) => {
    reqMua.find({}).then((request_ar) => {
        console.log(request_ar)
        res.render('./admin/checkMuaCpanel.ejs' , {
            request_ar : request_ar.map(s=>s.toJSON()),
        })
    });
}

const trangEditTtMua = async function (req, res) {
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
    }

const editTtMua = async (req,res) => {
    const doiTrangThai = ({
        isCheck : "true",
        hoahong : 300000/100 * 40
    })
    const a =  await reqMua.findByIdAndUpdate(req.params.id,doiTrangThai);
    try {
        a
        console.log("Check Trạng Thái",doiTrangThai);
        console.log("id" , req.params.id)
        b = await reqMua.findById(req.params.id)
        c = await User.findOne({email: b.email})
        f = await User.findById(b.id)
        console.log ( f , "USER ")
        g = await course.findOne({TenCourse : a.TenCourse})
        const ActiveKhoaHoc = ({
            cDaMua : "Học Làm Gà",
        })
        const UPDATELUOTMUA = ({
            selled : g.selled + 1
        })
        i = await course.findByIdAndUpdate(g._id, UPDATELUOTMUA)
        if( f === null ) {
            console.log (" KO CÓ NGƯỜI GIỚI THIỆU")
        } else {
            const UPDATEMONEY = ({
                tien : f.tien + b.hoahong
            })
            h = await User.findByIdAndUpdate(f.id, UPDATEMONEY)
        }
        d = await User.findByIdAndUpdate(c._id,ActiveKhoaHoc);
        e = await Cart.findOneAndDelete({id: req.params.id})
        res.redirect('/admin/lenh-mua-khoa-hoc')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const editTtMuaCancelled = async (req,res) => {
    const doiTrangThai = ({
        isCheck : "cancelled",
    })
    const a =  await reqMua.findByIdAndUpdate(req.params.id,doiTrangThai);
    try {
        a
        console.log("Check Trạng Thái",doiTrangThai);
        console.log("id" , req.params.id)
        b = await reqMua.findById(req.params.id)
        c = await User.findOne({email: b.email})
        const ActiveKhoaHoc = ({
            cDaMua : "",
        })
        d = await User.findByIdAndUpdate(c._id,ActiveKhoaHoc);
        e = await Cart.findByIdAndDelete(req.params.id)
        res.redirect('/admin/lenh-mua-khoa-hoc')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const loginpage = async (req, res) => {
    conflictError = null;
    res.render('./login/adminlogin.ejs', conflictError);
}


const login = async (req,res) => {
    const { email, pass} = req.body;

    if (email && pass) {
        const check = await Admin.findOne({ email: email});
        if(check === null) {
            const conflictError = 'Sai tài khoản hoặc mật khẩu.';
            res.render('./admin/adminlogin.ejs', { email, pass, conflictError});
        } else {
        const comparePassword = bcrypt.compareSync(pass, check.pass);
        console.log(comparePassword , "asd")
                if (comparePassword == true) {
                    req.session.Adminloggedin = true;
                    req.session.admin = check;
                    res.redirect('/admin');
                } else {
                    const conflictError = 'Sai tài khoản hoặc mật khẩu.';
                    res.render('./login/adminlogin.ejs', {email, pass, conflictError});
                }
        }
    } else {
        const conflictError = 'Sai tài khoản hoặc mật khẩu.';
        res.render('./login/adminlogin.ejs', { email, pass, conflictError});
    }
}

const register = async (req,res) => {
    const { email, pass, ten} = req.body;

    if (email && pass) {
        const check = await Admin.findOne({ email: email});
        check, (err, user) => {
            if ( err || user) {
                const conflictError = 'NGƯỜI DÙNG TỒN TẠI.';
                res.render('.login/register', { email, pass, ten, ref, conflictError})
            }
        }

        bcrypt.hash(pass, parseInt(process.env.BCRYPT_SALT_ROUND)).then(async (hashed) => {
            // Tạo người dùng
            const admin = new Admin({
                ten: ten,
                email: email,
                pass: hashed,
            });
            const s = new Admin(admin);
            console.log(s)
            const cre = await Admin.create(s)
            try {
                cre
                    res.redirect("/admin/login")
            } catch (error) {
                console.log(error)
            }
        })
    } else {
        const conflictError = 'Xin hãy nhập đầy đủ những thông tin như email, password và tên.';
    res.render('./login/dangky', { email, pass, ten, ref, conflictError});
    }
}

module.exports = {
    create,
    withdrawCpanel,
    edit,
    editpost,
    checkMua,
    editTtMua,
    editTtMuaCancelled,
    login,
    register,
    loginpage,

}