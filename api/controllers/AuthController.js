const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
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
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    res.errorHandler(400, "all fields are required");
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "user not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    // Authentication by token
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
const signInWithGoogle = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  signInWithGoogle,
};
