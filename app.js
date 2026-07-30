const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const groupRoutes = require("./routes/groupRoute");

app.use("/auth" , authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/groups", groupRoutes);


app.use(errorMiddleware);

module.exports = app;