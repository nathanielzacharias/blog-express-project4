const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const tagModel = require("../models/tags");
const articleModel =require("../models/articles");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = {

    showLatestPublished: async (req, res) => {
        let latestArticle = null;
    
        try {
          latestArticle = await articleModel.sort({ createdAt: -1 }).findOne({ published: true });
          // console.log(latestArticle)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return latestArticle" });
        }
    
        return res.status(200).json({ latestArticle });
      },
};
