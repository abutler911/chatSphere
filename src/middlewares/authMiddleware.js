function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to view this page");
  res.redirect("/login");
}

module.exports = isAuthenticated;
