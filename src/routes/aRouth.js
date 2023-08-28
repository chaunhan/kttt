const express = require('express');
const router = express.Router();
const login = require("../controllers/loginController");
const register = require("../controllers/regController");
const cpass = require("../controllers/cpassController");
const authMiddleware = require("../middlewares/auth.middlewares");


router.get('/login', authMiddleware.isAuth ,login.dangnhap)
router.post('/login', login.login)

router.get('/register', authMiddleware.isAuth, register.create)
router.post('/register', register.register)

router.get('/logout', authMiddleware.loggedin, login.logout)

router.get('/changepassword', authMiddleware.loggedin , cpass.create)
router.post('/changepassword', cpass.changepass)



module.exports = router;