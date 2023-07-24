const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  age: Number,
  gender: {
    type: String,
    required: [true, "Please add gender info"],
  },
});

const ContactsData = mongoose.model("ContactsData", contactSchema);
module.exports = ContactsData;
