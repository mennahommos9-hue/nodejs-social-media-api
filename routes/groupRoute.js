const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const validation = require("../middleware/validationMiddleware");

const {
    createGroupValidation,
    updateGroupValidation
} = require("../validations/groupValidation");

const {
    createGroup,
    getAllGroups,
    getOneGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    addAdmin,
    removeAdmin
} = require("../controllers/groupController");


router.post("/", auth, validation(createGroupValidation), createGroup);
router.get("/", auth, getAllGroups);
router.get( "/:id", auth, getOneGroup);
router.patch( "/:id", auth, validation(updateGroupValidation), updateGroup);
router.delete( "/:id", auth, deleteGroup);
router.post("/:groupId/members/:userId", auth, addMember);
router.delete("/:groupId/members/:userId", auth, removeMember);
router.patch("/:groupId/admins/:userId", auth, addAdmin);
router.delete("/:groupId/admins/:userId", auth, removeAdmin);


module.exports = router;