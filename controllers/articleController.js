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

    browsePublished: async (req, res) => {
        let articles = null;
    
        try {
          articles = await articleModel.sort({ createdAt: -1 }).find({});
          // console.log(articles)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return articles" });
        }
    
        return res.status(200).json({ articles });
      },

    showSelectedArticle: async (req, res) => {
        let selectedArticle = null;
        const articleTitle = req.body.title
    
        try {
            selectedArticle = await articleModel.find({title: articleTitle });
          // console.log(selectedArticle)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return selectedArticle" });
        }
    
        return res.status(200).json({ selectedArticle });
      },

    


    

};
