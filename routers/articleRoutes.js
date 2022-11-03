const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");


router.get("/latest", articleController.showLatestPublished); 
router.get("/browse", articleController.browsePublished); 
router.post("/browse", articleController.showSelectedArticle);


module.exports = router;
