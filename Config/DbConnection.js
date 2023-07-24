const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log("Data base is connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connection;
