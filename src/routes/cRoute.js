var express = require('express');
const router = express.Router();
const cController = require('../controllers/cController');
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/khoahoc", cController.create);
router.post('/themc',  cController.themCourse);
router.get("/edit/:id", cController.trangEdit)
router.post("/edit/:id", cController.edit)
router.get("/deleted/:id", cController.deleteCourse)
router.get("/detail/:TenCourse", cController.courseDetail)
router.get("/detail/1/:TenCourse", cController.courseDetail1)
router.post("/addcart", cController.addcart)
router.post("/guilenhmua", cController.guilenhMua)
router.get("/thanhtoan", authMiddleware.loggedin, cController.muaCoure)


module.exports= router;