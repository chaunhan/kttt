const express = require("express");
const authMiddleware = require("../middlewares/auth.middlewares");
const controllers = require("../controllers/indexController");
const router = express.Router();
const ctv = require("../controllers/ctvController");

router.get('/home', authMiddleware.loggedin, controllers.home);
router.get('/', controllers.index);
router.get('/profile',authMiddleware.loggedin, controllers.profile);
router.post('/updateprofile', authMiddleware.loggedin, controllers.updateprofile);
router.get('/dieu-khoan-dang-ky', async (req,res) => {
    res.render('./index/dieu-khoan.ejs')
})
// router.get("/cong-tac-vien", authMiddleware.loggedin, ctv.create);
module.exports = router;