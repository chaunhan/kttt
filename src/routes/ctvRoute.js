const express = require('express');
const router = express.Router();
const Ctv = require('../controllers/ctvController')
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/ctv", authMiddleware.loggedin, Ctv.create);
router.get("/ctv/rut-tien" , authMiddleware.loggedin, Ctv.withdraw)
router.get("/ctv/lich-su-giao-dich" , authMiddleware.loggedin, Ctv.withdraw)
router.get("/ctv/lich-su-rut-tien" , authMiddleware.loggedin, Ctv.withdraw)
router.get("/ctv/invoice" , authMiddleware.loggedin, Ctv.withdraw)
router.get("/ctv/users" , authMiddleware.loggedin, Ctv.withdraw)
router.post("/ctv/rut-tien", Ctv.addBank)


module.exports = router;