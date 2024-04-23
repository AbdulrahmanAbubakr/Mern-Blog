const User = require("../models/User");
const bcrypt = require("bcrypt");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400).send("All Fields are required");
  }
  // password hashing
  const hashedPassword = bcrypt.hashSync(password, 10);

  //   adding user to database
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  try {
    if (newUser) {
      res.status(201).json(newUser);
      console.log(newUser);
    } else {
      res.status(400).send("User already exists");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
};
