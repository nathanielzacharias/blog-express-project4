const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");


router.get("/latest", articleController.showLatestPublished); 
router.get("/browse/:id", articleController.showSelectedArticle);
router.get("/browse", articleController.browsePublished); 


module.exports = router;
