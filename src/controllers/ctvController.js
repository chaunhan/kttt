const authMiddleware = require("../middlewares/auth.middlewares");
const User = require('../models/user');
const BankInfor = require('../models/bankInfo');
const reqWithdraw = require ('../models/reqRutTien')
const EmailController = require('./EmailController');
const reqRutTien= require('./adminController');
const reqMua = require('../models/reqmua')
const { request } = require("express");

let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const emailOtp = Math.floor(Math.random() * 90000) + 10000;

const create = (req,res) => {
    const a = User.findOne({email: req.session.user.email }).then ((user) => {
        const tien = VND.format(user.tien)
        
        const refinTong = user._id ;
        console.log(refinTong)
        //////// tổng người tuyến dưới/////
        User.find({}).then((user1) => {
            var TongUserTuyenDuoi = 0;
            
            console.log(user1, " USER")
            for ( var i = 0; i < user1.length ; i++) {
                if (user1[i].ref == refinTong) {
                    var tam =0;
                    tam = tam + 1;
                    TongUserTuyenDuoi = TongUserTuyenDuoi + tam
                }
                console.log(TongUserTuyenDuoi, " Bộ Đếm")
            }
            console.log(TongUserTuyenDuoi, "Tổng Tuyến Dưới")

            reqMua.find({}).then((user2) => {
                var TongDonHangTuyenDuoi = 0;
                var TongDoanhThu = 0;
                for ( var i = 0; i < user2.length ; i++) {
                    if( user2[i].id == refinTong) {
                        var tam =0;
                        tam = tam + 1;
                        TongDonHangTuyenDuoi = TongDonHangTuyenDuoi + tam;
                        TongDoanhThu = user2[i].hoahong + TongDoanhThu;
                    }
                }

                console.log(TongDonHangTuyenDuoi, "USER TUYEN DUOI")

                const rutHistory = reqWithdraw.find({email: req.session.user.email}).then((request_ar) => {
                    var tiendarut = 0;
                    for ( var i= 0 ; i  < request_ar.length; i++) {
                        if(request_ar[i].isCheck == "true") {
                            tiendarut = request_ar[i].tienrut + tiendarut
                        }
                    }
                    console.log(tiendarut)
                    res.render('./ctv/index.ejs', {user: req.session.user, tien : tien, tiendarut: VND.format(tiendarut), tongTuyenDuoi : TongUserTuyenDuoi, tongDonTuyenDuoi: TongDonHangTuyenDuoi, tongDoanhThu: VND.format(TongDoanhThu)});
                });
            })
        })
    })
}

const withdraw = async (req,res) => {
    const conflictError = null;
    const tien = VND.format(req.session.user.tien)
    console.log(tien)
    await BankInfor.findOne({email: req.session.user.email}).then(async (bi) => {
        if(bi){
            console.log(bi)
            res.render('./ctv/with-draw', {user: req.session.user, bankinfo: bi.toJSON(), tien: tien, conflictError })
        } else {
            res.render('./ctv/with-draw-err', {user: req.session.user, tien: tien, conflictError })
        }
    })
}

const tradeHistory = async (req,res) => {
    const a = User.findOne({email: req.session.user.email }).then ((user) => {
        const refinTong = user._id
        console.log(refinTong)
        //////// tổng người tuyến dưới/////
        reqMua.find({}).then((user1) => {
            var ListDonHangTuyenDuoi = [];
            for ( var i = 0; i < user1.length ; i++) {
                if( user1[i].id == refinTong) {
                    ListDonHangTuyenDuoi.push(user1[i])
                }
            }
            console.log(ListDonHangTuyenDuoi, "USER TUYEN DUOI")
            res.render('./ctv/tradeHistory.ejs', {user: req.session.user, listTuyenDuoi : ListDonHangTuyenDuoi , idU: user._id});
        })
    })
}

const withdrawHistory = async (req, res) => {
    reqWithdraw.find({email: req.session.user.email}).then((request_ar) => {
        res.render("./ctv/withdrawHistory.ejs" , {
            request_ar : request_ar.map(s=>s.toJSON()),
        })
    });
}

const invoice = async (req, res) => {
    const a = User.findOne({email: req.session.user.email }).then ((user) => {
        const refinTong = user._id
        console.log(refinTong)
        //////// tổng người tuyến dưới/////
        reqMua.find({}).then((user1) => {
            var ListDonHangTuyenDuoi = [];
            for ( var i = 0; i < user1.length ; i++) {
                if( user1[i].id == refinTong) {
                    ListDonHangTuyenDuoi.push(user1[i])
                }
            }
            console.log(ListDonHangTuyenDuoi, "USER TUYEN DUOI")

            res.render('./ctv/ListDonHangCon.ejs', {user: req.session.user, listTuyenDuoi : ListDonHangTuyenDuoi , idU: user._id});
        })
    })
}
const users = async (req,res) => {
    const a = User.findOne({email: req.session.user.email }).then ((user) => {
        const refinTong = user._id ;

        //////// tổng người tuyến dưới/////
        User.find({}).then((user1) => {
            var ListUserTuyenDuoi = [];
            for ( var i = 0; i < user1.length ; i++) {
                if (user1[i].ref == refinTong) {
                    ListUserTuyenDuoi.push(user1[i]);
                }
            }
            console.log(ListUserTuyenDuoi, "USER TUYEN DUOI")
            res.render('./ctv/ListUserCon.ejs', {user: req.session.user, listTuyenDuoi : ListUserTuyenDuoi});
        })
    })
}

const sendOtp = async (req,res) => {
    const email = req.session.user.email
    await EmailController.sendEmailCreateOrder(email,emailOtp)
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

const xoaBank = async (req,res) => {
    const s = req.body;
    console.log(s)
    const email = req.session.user.email;

    console.log(s)
    try {
        const u= await BankInfor.findOneAndDelete({email: email})
        if(!u){
            res.send("USER CHƯA CÓ BANK")
        }else{
            res.redirect("/ctv/rut-tien")
        }
    }catch (e){
        console.log(e)
    }
}

const withdraw1 = async (req, res) => {
    const {phone_otp, amount} = req.body
    console.log(amount)
    const tien = VND.format(req.session.user.tien)
    console.log(tien)

    if (phone_otp && amount) {
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
            await BankInfor.findOne({email: req.session.user.email }).then(async (bankI4) => {
                const conflictError = 'OTP không hợp lệ.';
                res.render('./ctv/with-draw.ejs', {user: req.session.user, bankinfo: bankI4.toJSON() , conflictError , tien: tien});
            })
        }
    }else {
        await BankInfor.findOne({email: req.session.user.email }).then(async (bankI4) => {
            const conflictError = 'Số tiền muốn rút hoặc mã OTP không hợp lệ.';
            res.render('./ctv/with-draw.ejs', {user: req.session.user, bankinfo: bankI4.toJSON(), conflictError, tien: tien});
        })
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
    xoaBank,
    withdraw1,
    sendOtp,
    rut_tien_thanh_cong
}