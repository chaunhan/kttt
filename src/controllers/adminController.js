
const reqWithdraw = require ('../models/reqRutTien')
const BankInfor = require('../models/bankInfo');
const authMiddleware = require("../middlewares/auth.middlewares");


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
    await reqWithdraw.findById(req.params.id).then((request) => {
        if (request) {
            console.log(request);
            res.render("./admin/xetDuyetRutTien.ejs", {
            request: request.toJSON(),
        });
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
    console.log("A",a);

    res.redirect('/admin/lenh-rut-tien')
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}



module.exports = {
    create,
    withdrawCpanel,
    edit,
    editpost,
}