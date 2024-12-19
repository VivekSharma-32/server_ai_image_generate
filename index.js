require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const imageRoutes = require("./routes/imageRoutes");
const connectDB = require("./config/db");

connectDB();

app.use("/api", imageRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
});
