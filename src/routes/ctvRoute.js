const express = require('express');
const router = express.Router();
const Ctv = require('../controllers/ctvController')
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/ctv", authMiddleware.loggedin, Ctv.create);
router.get("/ctv/rut-tien" , authMiddleware.loggedin, Ctv.withdraw)
router.get("/ctv/lich-su-giao-dich" , authMiddleware.loggedin, Ctv.tradeHistory)
router.get("/ctv/lich-su-rut-tien" , authMiddleware.loggedin, Ctv.withdrawHistory)
router.get("/ctv/invoice" , authMiddleware.loggedin, Ctv.invoice)
router.get("/ctv/users" , authMiddleware.loggedin, Ctv.users)
router.post("/ctv/addbank", Ctv.addBank)
router.post("/ctv/xoaBank", Ctv.xoaBank)
router.post("/ctv/rut-tien", Ctv.withdraw1)
router.post("/ctv/sendotp", Ctv.sendOtp)
router.get("/ctv/rut_tien_thanh_cong",authMiddleware.loggedin, Ctv.rut_tien_thanh_cong)


module.exports = router;