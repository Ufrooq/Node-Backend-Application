const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.EXCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("Tokken is expired !!");
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(400);
    throw new Error("User is not aut  token miss !!");
  }
});

module.exports = validateToken;
