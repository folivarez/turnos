const express = require("express");
const router = express.Router();
var passport = require("passport");
var back = require("express-back");

const auth_controller = require("../controllers/auth.controller");

router.get("/home", auth_controller.home);

router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "dashboard",
    failureRedirect: "home"
  })
);

router.post(
  "/home",
  passport.authenticate("local-login", {
    successReturnToOrRedirect: "/castraciones/dashboard",
    failureRedirect: "home"
  })
);
router.get("/profile", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/castraciones/home");
});

module.exports = router;

//route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/castraciones/home");
}
