const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const uploadToImageKit = require("../utils/uploadToImageKit");
const Group = require("../models/groupModel");


const createPost = catchAsync(async (req, res, next) => {

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
        imageUrls = await Promise.all(
            req.files.map(file =>
                uploadToImageKit(file)
            )
        );
    }

    const { title, content, image, group } = req.body;

    if (group) {

    const foundGroup = await Group.findById(group);

    if (!foundGroup) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const isMember = foundGroup.members.some(
        member => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
        return next(
            new AppError(
                "You are not a member of this group",
                403
            )
        );
    }

}
    const post = await Post.create({title , content, group, images: imageUrls, author: req.user._id});

    res.status(201).json({
        success: true , post
    });

});


const getAllPosts = catchAsync(async (req, res, next) => {

    const posts = await Post.find()
        .populate("author", "userName")
        .populate("group", "name")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true, posts
    });

});


const getUserPosts = catchAsync(async (req, res, next) => {

    const posts = await Post.find({
        author: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true , posts
    });

});


const updatePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(
            new AppError("Post not found", 404)
        );
    }

    if (req.user.role !== "super-admin" && post.author.toString() !== req.user._id.toString()) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

        let imageUrls = post.images;

if (req.files && req.files.length > 0) {
    imageUrls = await Promise.all(
        req.files.map(file =>
            uploadToImageKit(file)
        )
    );

}
    const updatedPost = await Post.findByIdAndUpdate(req.params.id , {...req.body ,images: imageUrls } ,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true , post: updatedPost
    });

});


const deletePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(
            new AppError("Post not found", 404)
        );
    }

    if (
        req.user.role !== "super-admin" &&
        post.author.toString() !== req.user._id.toString()
    ) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true , message: "Post deleted successfully"
    });

});

module.exports = {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost
};