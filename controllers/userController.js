const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");


const getAllUsers = catchAsync(async(req , res , next)=>{

    const users = await User.find({} , {password:0});

    res.status(200).json({
        success: true , users
    })
});


const getOneUser = catchAsync(async(req , res , next)=>{

    const user = await User.findById(req.params.id , {password:0})

    if(!user){
        return next(
            new AppError("User not found", 404)
        );
    }

    res.status(200).json({
        success: true , user
    });
});


const updateUser = catchAsync(async(req , res , next)=>{

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    };

    const user = await User.findByIdAndUpdate(req.params.id, req.body , 
        {new: true ,
        runValidators: true,
        projection: {
            password: 0
        }})

    if(!user){
        return next(
            new AppError("User not found", 404)
        );
    }

    res.status(200).json({
        success: true , user
    });
});


const deleteUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(
            new AppError("User not found", 404)
        );
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });

});


module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};