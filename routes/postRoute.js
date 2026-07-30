const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const validation = require("../middleware/validationMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {createPostValidation , updatePostValidation} = require("../validations/postValidation");

const {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost
} = require("../controllers/postController");


router.post( "/", auth , upload.array("images", 5), validation(createPostValidation), createPost);
router.get( "/", auth, getAllPosts);
router.get("/my-posts", auth, getUserPosts);
router.patch("/:id", auth, upload.array("images", 5), validation(updatePostValidation), updatePost);
router.delete("/:id", auth, deletePost);


module.exports = router;