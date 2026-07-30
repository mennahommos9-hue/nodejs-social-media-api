const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{console.log("DB Connected!")})
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });
};

module.exports = connectDB;