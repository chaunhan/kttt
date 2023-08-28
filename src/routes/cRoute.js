var express = require('express');
const router = express.Router();
const cController = require('../controllers/cController')

router.get("/khoahoc", cController.create);
router.post('/themc',  cController.themCourse);
router.get("/edit/:id", cController.trangEdit)
router.post("/edit/:id", cController.edit)
router.get("/deleted/:id", cController.deleteCourse)
router.get("/detail/:TenCourse", cController.courseDetail)
router.get("/detail/1/:TenCourse", cController.courseDetail1)

module.exports= router;