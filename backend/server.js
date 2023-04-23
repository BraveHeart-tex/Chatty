require("dotenv").config();

const express = require("express");
const { chats } = require("./dummy-data/data");
const { connectToDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectToDB().then(() => {
  console.log("Connected to MongoDB");
});

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
