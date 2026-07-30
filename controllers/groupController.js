const Group = require("../models/groupModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");


const createGroup = catchAsync(async (req, res, next) => {

    const { name, permissions } = req.body;

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
        return next(
            new AppError("Group already exists", 400)
        );
    }

    const group = await Group.create({name , permissions , admins: [req.user._id] , members: [req.user._id]});

    res.status(201).json({
        success: true , group
    });

});


const getAllGroups = catchAsync(async (req, res, next) => {

    const groups = await Group.find()
        .populate("admins", "userName")
        .populate("members", "userName");

    res.status(200).json({
        success: true , groups
    });

});


const getOneGroup = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.id)
        .populate("admins", "userName")
        .populate("members", "userName");

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    res.status(200).json({
        success: true , group
    });

});


const updateGroup = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.id);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const updatedGroup = await Group.findByIdAndUpdate( req.params.id, req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true , group: updatedGroup
    });

});


const deleteGroup = catchAsync(async (req, res, next) => {

    const group = await Group.findByIdAndDelete(req.params.id);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    res.status(200).json({
        success: true , message: "Group deleted successfully"
    });

});


const addMember = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.groupId);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(
            new AppError("User not found", 404)
        );
    }

    const isAdmin = group.admins.some(
        admin => admin.toString() === req.user._id.toString()
    );

    if (
        req.user.role !== "super-admin" &&
        !isAdmin
    ) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

    const isMember = group.members.some(
        member => member.toString() === req.params.userId
    );

    if (isMember) {
        return next(
            new AppError("User already a member", 400)
        );
    }

    group.members.push(req.params.userId);

    await group.save();

    res.status(200).json({
        success: true,
        message: "Member added successfully", group
    });

});


const removeMember = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.groupId);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const isAdmin = group.admins.some(
        admin => admin.toString() === req.user._id.toString()
    );

    if (
        req.user.role !== "super-admin" &&
        !isAdmin
    ) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

    group.members = group.members.filter(
        member => member.toString() !== req.params.userId
    );

    await group.save();

    res.status(200).json({
        success: true,
        message: "Member removed successfully",
        group
    });

});



const addAdmin = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.groupId);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const isAdmin = group.admins.some(
        admin => admin.toString() === req.user._id.toString()
    );

    if (
        req.user.role !== "super-admin" &&
        !isAdmin
    ) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

    const alreadyAdmin = group.admins.some(
        admin => admin.toString() === req.params.userId
    );

    if (alreadyAdmin) {
        return next(
            new AppError("User already admin", 400)
        );
    }

    group.admins.push(req.params.userId);

    await group.save();

    res.status(200).json({
        success: true,
        message: "Admin added successfully",
        group
    });

});


const removeAdmin = catchAsync(async (req, res, next) => {

    const group = await Group.findById(req.params.groupId);

    if (!group) {
        return next(
            new AppError("Group not found", 404)
        );
    }

    const isAdmin = group.admins.some(
        admin => admin.toString() === req.user._id.toString()
    );

    if (
        req.user.role !== "super-admin" &&
        !isAdmin
    ) {
        return next(
            new AppError("You are not allowed", 403)
        );
    }

    group.admins = group.admins.filter(
        admin => admin.toString() !== req.params.userId
    );

    await group.save();

    res.status(200).json({
        success: true,
        message: "Admin removed successfully",
        group
    });

});


module.exports = {
    createGroup,
    getAllGroups,
    getOneGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    addAdmin,
    removeAdmin
};