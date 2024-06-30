const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser')
env.config();
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// cors middleware
app.use(cors());
// userRouter
app.use("/api/user", userRoute);
// authRouter
app.use("/api/auth", authRoute);
// middleware and function to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
