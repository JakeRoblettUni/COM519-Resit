const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.get("/logout", (req, res) => {
    res.logout();
    res.redirect("/");
});

router.get("/account", wrap(async (req, res) => {
    let user = await req.authenticate();
    res.render("auth/account", { user });
}));