var mongoose = require("mongoose"),

userSchema   = new mongoose.Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
