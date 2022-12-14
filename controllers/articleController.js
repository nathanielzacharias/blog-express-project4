const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const tagModel = require("../models/tags");
const articleModel =require("../models/articles");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = {

    showLatestPublished: async (req, res) => {
        let latestArticle = null;
        let returnArticle = null;
    
        try {
          latestArticle = await articleModel.find({ published: true }).sort({ createdAt: -1 })
        //   console.log(latestArticle)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return latestArticle" });
        }
        
        returnArticle = latestArticle[0]
        return res.status(200).json({ returnArticle });
      },

    browsePublished: async (req, res) => {
        let articles = null;
    
        try {
          articles = await articleModel.find({ published: true }).sort({ createdAt: -1 });
        //   console.log(articles)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return articles" });
        }
    
        return res.status(200).json({ articles });
      },

    showSelectedArticle: async (req, res) => {
        let selectedArticle = null;
        const articleID = req.params.id
    
        try {
            selectedArticle = await articleModel.find({ _id: articleID });
          // console.log(selectedArticle)
        } catch (err) {
          res.status(500);
          return res.json({ error: "failed to return selectedArticle" });
        }
    
        return res.status(200).json({ selectedArticle });
      },

    saveArticle: async (req, res) => {
        let decoded = null
        //decode data
        try {
            //decode the jwt token to get username from data
            decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    
            // if token is falsy, return unauthorised 
            if (!decoded) {
                return res.status(401).json({ msg: "unauthorised" })
            }
        } catch (err) {
            return res.status(500).json({ error: "failed to decode JWT" });
        }
        
        let savedArticle = null
        const data = req.body
        const user = await userModel.find({ username: decoded.data.username })
        const userID = user[0]._id
        // const authorName = user[0].username
        // console.log(authorName)
        try {
            savedArticle = await articleModel.create({
                title: data.title,
                author: userID,
                summary: data.summary,
                published: data.published,
                body: data.body,
                // tags: data.tags,
                // images: data.images,
            })
            // console.log(savedArticle)
          } catch (err) {
            res.status(500);
            return res.json({ error: "failed to save article" });
          }

        return res.status(200).json({ msg: "save successful" })
      },

      publishArticle: async (req, res) => {
        let decoded = null
        //decode data
        try {
            //decode the jwt token to get username from data
            decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    
            // if token is falsy, return unauthorised 
            if (!decoded) {
                return res.status(401).json({ msg: "unauthorised" })
            }
        } catch (err) {
            return res.status(500).json({ error: "failed to decode JWT" });
        }
        
        let publishedArticle = null
        const filter = { title: req.body.title }
        const update = { published: true }
        try {
            publishedArticle = await articleModel.findOneAndUpdate(filter, update)
            // publishedArticle = await articleModel.findOne(filter)
            // console.log(publishedArticle.published)
          } catch (err) {
            res.status(500);
            return res.json({ error: "failed to publish article" });
          }

        return res.status(200).json({ msg: "article is successfully published" })
      },

    updateArticle: async (req, res) => {
        let decoded = null
        //decode data
        try {
            //decode the jwt token to get username from data
            decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    
            // if token is falsy, return unauthorised 
            if (!decoded) {
                return res.status(401).json({ msg: "unauthorised" })
            }
        } catch (err) {
            return res.status(500).json({ error: "failed to decode JWT" });
        }
        
        let article = null
        const filter = { _id: req.body._id }
        const update = { summary: req.body.summary }
        try {
            article = await articleModel.findOneAndUpdate(filter, update)
            // article = await articleModel.findOne(filter)
            // console.log(article)
          } catch (err) {
            res.status(500);
            return res.json({ error: "failed to update article" });
          }

        return res.status(200).json({ msg: "article is successfully updated" })
      },

      deleteArticle: async (req, res) => {
        let decoded = null
        //decode data
        try {
            //decode the jwt token to get username from data
            decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    
            // if token is falsy, return unauthorised 
            if (!decoded) {
                return res.status(401).json({ msg: "unauthorised" })
            }
        } catch (err) {
            return res.status(500).json({ error: "failed to decode JWT" });
        }
        
        let article = null
        // const filter = { title: req.body.title }
        const filter = { _id: req.body.docID}
        try {
            article = await articleModel.deleteOne(filter)
            // console.log(article)
          } catch (err) {
            res.status(500);
            return res.json({ error: "failed to delete article" });
          }

        return res.status(200).json({ msg: `successfully deleted ${article.deletedCount} article(s)` })
      },

      showAllPosts: async (req, res) => {
        let decoded = null
        //decode data
        try {
            //decode the jwt token to get username from data
            decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    
            // if token is falsy, return unauthorised 
            if (!decoded) {
                return res.status(401).json({ msg: "unauthorised" })
            }
        } catch (err) {
            return res.status(500).json({ error: "failed to decode JWT" });
        }
        
        let allPosts = null
        const data = req.body
        const user = await userModel.find({ username: decoded.data.username })
        const userID = user[0]._id
        try {
            allPosts = await articleModel.find({ author: userID })
            // console.log(savedArticle)
          } catch (err) {
            res.status(500);
            return res.json({ error: "failed to find all posts" });
          }

        return res.status(200).json({ allPosts })
      },

        

};
