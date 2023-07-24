const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add user name"],
  },
  email: {
    type: String,
    required: [true, "Please add email address"],
    unique: [true, "This email address already taken !"],
  },
  password: {
    type: String,
    required: [true, "Please Enten a password !! "],
  },
});

const userData = mongoose.model("userData", userSchema);
module.exports = userData;
