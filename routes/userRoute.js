const express = require("express");
const auth = require("../middleware/authMiddleware");
const restrictTo = require("../middleware/restrictToMiddleware");
const validation = require("../middleware/validationMiddleware");
const {updateUserValidation} = require("../validations/userValidation");
const router = express.Router();
const{
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/" , auth , restrictTo("admin" , "super-admin") , getAllUsers );
router.get("/:id" , auth , restrictTo("admin" , "super-admin") , getOneUser);
router.patch("/:id" , auth , validation(updateUserValidation) , updateUser);
router.delete("/:id" , auth , deleteUser);

module.exports = router;