const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  picURL: {
    type: String,
  },

  aboutMe: {
    type: String,
  },
  
});
const User = mongoose.model("User", userSchema);
module.exports = User;
