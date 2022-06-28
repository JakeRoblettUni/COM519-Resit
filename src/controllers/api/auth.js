const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

router.post("/auth/register", wrap(async (req, res) => {
    let username = req.provided.parameter("username", { required: true });
    let email = req.provided.parameter("email", { required: true });
    let password = req.provided.parameter("password", { required: true });

    let user = await res.register(username, email, password);

    res.api.success({ user });
}));

router.post("/auth/login", wrap(async (req, res) => {
    let identifier = req.provided.parameter("identifier", { required: true });
    let password = req.provided.parameter("password", { required: true });

    let { user, token } = await res.login(identifier, password);

    res.api.success({
        user, token
    });
}));

router.get("/auth/me", wrap(async (req, res) => {
    let user = await req.authenticate({ required: true });
    res.api.success({ user });
}));