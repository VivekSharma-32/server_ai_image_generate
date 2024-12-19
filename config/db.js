const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(`Error while connecting to DB: ${error}`);
  }
};

module.exports = connectDB;
