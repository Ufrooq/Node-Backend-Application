const express = require("express");
const router = express.Router();
const {
  getAllContact,
  postContact,
  putContact,
  getContact,
  deleteContact,
} = require("../Controllers/contactControllers");
const validateToken = require("../middleWare/validateTokenHandler");

// validating user excess -->
router.use(validateToken);

// route for getting all contacts -->
router.get("/", getAllContact);

// route for creating contact -->
router.post("/", postContact);

// route for getting a single contact -->
router.get("/:id", getContact);

// route for updating a contact -->
router.put("/:id", putContact);

// route for deleting a contact -->
router.delete("/:id", deleteContact);

module.exports = router;
