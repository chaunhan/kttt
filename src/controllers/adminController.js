
const reqWithdraw = require ('../models/reqRutTien')
const User = require('../models/user');
const authMiddleware = require("../middlewares/auth.middlewares");


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
    const s = (req.body);
    console.log("sdsad ",s);
    try {
        const a =  await reqWithdraw.findByIdAndUpdate(req.params.id,
            s);
        console.log("A",s);
    res.redirect('/admin/lenh-rut-tien')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const editMoney = async (req,res) => {
    const s = (req.body);
    console.log("sdsad ",s);
    if (s.isCheck == "true"){
        const user = await User.findOne({email : s.email})

        const UpdateTien = ({
            tien: parseInt(s.tien1) - parseInt(s.tienrut1)
        })
        console.log(UpdateTien)
        const b = await User.findByIdAndUpdate(user._id, UpdateTien)
        try {
            b
            res.redirect("/admin/lenh-rut-tien")
        }catch (e) {
            console.log(e)
        }
    }
    
}



module.exports = {
    create,
    withdrawCpanel,
    edit,
    editpost,
    editMoney
}