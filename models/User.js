var mongoose = require("mongoose"),

userSchema   = new mongoose.Schema({
  googleID: String
});

mongoose.model("users", userSchema);
