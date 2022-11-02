const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new mongoose.Schema({

  tag: {
    type: String,
    required: true,
    unique: true,
  },

  articleID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],

  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

});
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
