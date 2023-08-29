const authMiddleware = require("../middlewares/auth.middlewares");
const User = require('../models/user');
const BankInfor = require('../models/bankInfo');


let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});


const create = (req,res) => {
    const tien = VND.format(req.session.user.tien)
    console.log(tien)
    res.render('./ctv/index.ejs', {user: req.session.user, tien : tien});
}

const withdraw = async (req,res) => {
    const tien = VND.format(req.session.user.tien)
    console.log(tien)
    const {amout , phone_otp} = req.body
    await BankInfor.findOne({email: req.session.user.email}).then((bi) => {
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
    const emailOtp = Math.floor(Math.random() * 90000) + 10000;
    const email = req.session.user.email

}

module.exports = {
    create,
    withdraw,
    tradeHistory,
    withdrawHistory,
    invoice,
    users,
    addBank,
    withdraw1
}