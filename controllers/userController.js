const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const mongoose = require("mongoose");

module.exports = {
  register: async (req, res) => {

    const pwHash = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, password: pwHash };

    try {
      await userModel.create(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed registration" });
    }

    return res.json();
  },
};
