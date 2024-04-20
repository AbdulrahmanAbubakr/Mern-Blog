const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
env.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
