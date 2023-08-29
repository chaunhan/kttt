const authMiddleware = require("../middlewares/auth.middlewares");
const User = require('../models/user');
const BankInfor = require('../models/bankInfo');
const reqWithdraw = require ('../models/reqRutTien')
const EmailController = require('./EmailController');
const reqRutTien= require('./adminController');


let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const emailOtp = Math.floor(Math.random() * 90000) + 10000;

const create = (req,res) => {
    const tien = VND.format(req.session.user.tien)
    console.log(tien)
    res.render('./ctv/index.ejs', {user: req.session.user, tien : tien});


}

const withdraw = async (req,res) => {
    const tien = VND.format(req.session.user.tien)
    console.log(tien)
    await BankInfor.findOne({email: req.session.user.email}).then(async (bi) => {
        if(bi){
            console.log(bi)
            res.render('./ctv/with-draw', {user: req.session.user, bankinfo: bi.toJSON(), tien: tien})
        } else {
            res.render('./ctv/with-draw-err', {user: req.session.user, tien: tien})
        }
    })
}

const tradeHistory = async (req,res) => {

}

const withdrawHistory = async (req, res) => {

}

const invoice = async (req, res) => {

}
const users = async (req,res) => {

}

const sendOtp = async (req,res) => {
    const email = req.session.user.email
    await EmailController.sendEmailCreateOrder(email,emailOtp)
    console.log(emailOtp)
}

const addBank = async (req,res) => {
    const s = req.body;
    const email = req.session.user.email;

    console.log(s)
    
    const bankInfo = new BankInfor ({
        email: email,
        bankName: s.name,
        account : s.account,
        number : s.number
    })
    console.log(bankInfo)
    const cre = await BankInfor.create(bankInfo);
    try{
        cre
        res.redirect("/ctv/rut-tien")
    }catch (e){
        console.log(e)
    }
}

const withdraw1 = async (req, res) => {
    const {phone_otp, amount} = req.body
    console.log(amount)
    if(emailOtp == phone_otp){
        await BankInfor.findOne({email: req.session.user.email }).then(async (bankI4) => {
            const request = new reqWithdraw({
                ten: req.session.user.name,
                email: req.session.user.email,
                tienrut: amount,
                bankName: bankI4.bankName,
                bankAcc: bankI4.account,
                bankNumber: bankI4.number
            });
            console.log(request)
            const cre = await reqWithdraw.create(request)
            try {
                cre
                    res.redirect("/ctv/rut_tien_thanh_cong")
            } catch (error) {
                console.log(error)
            }
        })
    }else {

    }

}

const rut_tien_thanh_cong = async (req, res) => {
    res.render("./ctv/withdraw-succ", {user: req.session.user})
}

module.exports = {
    create,
    withdraw,
    tradeHistory,
    withdrawHistory,
    invoice,
    users,
    addBank,
    withdraw1,
    sendOtp,
    rut_tien_thanh_cong
}