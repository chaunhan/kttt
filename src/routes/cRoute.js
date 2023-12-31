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
router.get("/lesson/:TenBai" , cController.baihoc)
router.get("/lessons/:TenBai" , cController.baihocs)

router.post("/addbaihoc", cController.addBaihoc)
router.post("/addcart", authMiddleware.loggedin, cController.addcart)
router.post("/guilenhmua", authMiddleware.loggedin, cController.guilenhMua)
router.get("/thanhtoan", authMiddleware.loggedin, cController.muaCoure)


module.exports= router;