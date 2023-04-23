const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },
    picture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdGouD75_lVEncH-Hu1naif3TDh6VKv3iwZqz2t6mOA7YkG1j&s",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;
