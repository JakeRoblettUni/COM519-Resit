const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

const Directory = require("../../models/directory");

router.get(["/files", "/files/*"], wrap(async (req, res) => {
    let user = await req.authenticate();
    let homeDirectory = await Directory.findById(user.homeDirectory);

    let path = req.params[0]?.split("/") || [];

    let workingDirectory = homeDirectory;
    let directories = await Directory.find({ parent: homeDirectory._id, owner: user._id });

    res.render("files/directory", {
        workingDirectory,
        directories,
        files: []
    });
}));