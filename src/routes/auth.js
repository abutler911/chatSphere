const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  const messages = {
    error: req.flash("error"),
    success_msg: req.flash("success_msg"),
  };
  res.render("login.ejs", {
    title: "Login",
    messages: messages,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/rooms",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
