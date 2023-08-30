const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/admin", adminController.create)
router.get("/admin/lenh-rut-tien", adminController.withdrawCpanel)
router.get("/admin/lenh-rut-tien/xuly/:id", adminController.edit)
router.post("/admin/lenh-rut-tien/xuly/:id", adminController.editpost)
router.post("/admin/updateMoney", adminController.editMoney)
router.get("/admin/lenh-mua-khoa-hoc", adminController.checkMua)
router.get("/admin/doiTtMua/:id", adminController.editTtMua)

module.exports = router;