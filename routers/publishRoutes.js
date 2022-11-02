const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");


router.post("/save", articleController.saveArticle)


module.exports = router;
