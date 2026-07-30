const express = require("express");
const {register , login} = require("../controllers/authController")

const router = express.Router();
const validation = require("../middleware/validationMiddleware");
const {registerValidation , loginValidation} = require("../validations/authValidation");

router.post("/register" , validation(registerValidation) , register);
router.post("/login" , validation(loginValidation) , login);

module.exports = router;
