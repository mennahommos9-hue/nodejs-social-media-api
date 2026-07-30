const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");


const register = catchAsync(async (req , res , next)=>{
    const {userName , email , password , role} = req.body;

    const existingUser = await Users.findOne({email});
    if(existingUser){
        return next(
            new AppError("Email already exist!" , 400)
        )
    };

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await Users.create({userName , email , password: hashedPassword , role});

    res.status(201).json({
        success: true,
        message: "User registered successfully",user
    });
});


const login = catchAsync(async (req , res , next)=>{
    const {email , password} = req.body;

    const user = await Users.findOne({email});
    if(!user){
        return next(
            new AppError("Invalid email or password", 401)
        )
    };

    const isMatch = await bcrypt.compare(password , user.password);
    if (!isMatch) {
        return next(
            new AppError("Invalid email or password", 401)
        );
    };

    const token = generateToken(user._id);

    res.status(200).json({
        success: true, 
        token , user
    });
});

module.exports = { register , login}