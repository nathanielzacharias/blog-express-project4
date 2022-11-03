const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");


router.post("/save", articleController.saveArticle)
router.post("/publish", articleController.publishArticle)
router.post("/update", articleController.updateArticle)
router.post("/delete", articleController.deleteArticle)
router.post("/show-all-posts", articleController.showAllPosts)


module.exports = router;
