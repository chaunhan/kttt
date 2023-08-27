const express = require("express");
const authMiddleware = require("../middlewares/auth.middlewares");
const controllers = require("../controllers/indexController");
const router = express.Router();

router.get('/home', authMiddleware.loggedin, controllers.home)
router.get('/admin', controllers.admin)
router.get('/userlist', controllers.userlist)
module.exports = router;