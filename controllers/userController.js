const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const mongoose = require("mongoose");

module.exports = {
  register: async (req, res) => {

    // console.log(req.body.username)
    // console.log(req.body.email)
    // console.log(req.body.password)

    const pwHash = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, password: pwHash };

    try {
      await userModel.create(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed registration" });
    }

    return res.status(201).json({ msg: "registration successful" });
  },

  //get register used for testing only
  getregister: async (req, res) => {
    return res.json('hello')
  },


  login: async (req, res) => {

    // const body = req.body;
    const errMsg = "username or password is incorrect";
    let user = null;

    try {
      user = await userModel.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({ error: errMsg });
      }

    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    // console.log("passed try block")
    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordOk) {
      return res.status(401).json({ error: errMsg });
    }
    return res.status(200).json({ msg: "all good" })

  }

};
