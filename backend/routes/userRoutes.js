const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser).get(getAllUsers);
router.route("/login").post(authUser);

module.exports = router;
