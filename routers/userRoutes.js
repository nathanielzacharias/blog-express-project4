const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/register", userController.getregister); //for testing

router.post("/login", userController.login);

router.post("/about", userController.about);


module.exports = router;
