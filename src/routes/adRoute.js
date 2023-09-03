const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const controllers = require("../controllers/indexController");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/admin", authMiddleware.Adminloggedin, adminController.create)
router.get("/admin/lenh-rut-tien", authMiddleware.Adminloggedin, adminController.withdrawCpanel)
router.get("/admin/lenh-rut-tien/xuly/:id", authMiddleware.Adminloggedin, adminController.edit)
router.get("/admin/lenh-mua-khoa-hoc", authMiddleware.Adminloggedin, adminController.checkMua)
router.get("/admin/doiTtMua/:id", authMiddleware.Adminloggedin, adminController.editTtMua)
router.get("/admin/doiTtMuaCancelled/:id", authMiddleware.Adminloggedin, adminController.editTtMuaCancelled)
router.get('/userlist', authMiddleware.Adminloggedin, controllers.userlist)
router.get("/admin/login", authMiddleware.isAdmin, adminController.loginpage)

router.post("/admin/lenh-rut-tien/xuly/:id", adminController.editpost)
router.post("/admin/login", adminController.login)
router.post('/admin/register', adminController.register)

module.exports = router;