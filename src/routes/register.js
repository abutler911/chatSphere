const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { route } = require("../app");

const router = express.Router();
router.get("/register", (req, res) => {
  res.render("register.ejs", {
    title: "Register",
  });
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
