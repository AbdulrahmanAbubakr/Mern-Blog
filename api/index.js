const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const app = express();
app.use(express.urlencoded({ extended: true }));



mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));





// userRouter
app.use('/api/user', userRoute)
// authRouter
app.use('/api/auth', authRoute)