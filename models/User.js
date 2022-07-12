const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  email: String,
  age: Number,
  createdOn: { type: Date, default: Date.now() },
});
const User = mongoose.model("user", userSchema);
module.exports = User;