const authMiddleware = require("../middlewares/auth.middlewares");
const User = require('../models/user');
const BankInfor = require('../models/bankInfo');


const create = (req,res) => {
    res.render('./ctv/index.ejs', {user: req.session.user});
}

const withdraw = async (req,res) => {
    const bankinfo = BankInfor.findOne({email: req.session.user.email})
    res.render('./ctv/with-draw', {user: req.session.user, bankinfo: bankinfo})
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
    const cre = await BankInfor.create(bankInfo);
    try{
        cre
    }catch (e){
        console.log(e)
    }
}

module.exports = {
    create,
    withdraw,
    tradeHistory,
    withdrawHistory,
    invoice,
    users,
    addBank

}