const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new mongoose.Schema({

  title: {
    type: String,
  },

  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  summary: {
    type: String,
  },

  published: {
    type: Boolean,
  },

  body: {
    type: String,
  },

  tags: {
    type: [],
  },

  images: {
    type: [],
  },

  timestamps: true ,
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
