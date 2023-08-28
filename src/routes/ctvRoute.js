const express = require('express');
const router = express.Router();
const Ctv = require('../controllers/ctvController')
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/ctv", authMiddleware.loggedin, Ctv.create);


module.exports = router;