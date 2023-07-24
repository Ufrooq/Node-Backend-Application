const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../Controllers/userControllers");
const validateToken = require("../middleWare/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
