require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Server is Running on ${process.env.PORT || 3000}...`);
})