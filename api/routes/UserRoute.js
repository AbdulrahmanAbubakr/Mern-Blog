const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {verifyToken} = require("../utils/verifyUser");
// test
router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});
router.put("/update/:userId", verifyToken, userController.updateUser);
module.exports = router;
