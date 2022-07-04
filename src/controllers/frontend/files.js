const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

const File = require("../../models/file");

router.get(["/files", "/files/*"], wrap(async (req, res) => {
    let user = await req.authenticate();
    let path = req.params[0] || "";

    if(!path.startsWith("/"))
        path = "/" + path;

    let allFiles = await File.find({ owner: user._id });

    let files = [];
    let folders = [];

    for(let file of allFiles) {
        if(path === file.path + file.name) {
            
        }

        if(!folders.includes(file.path) && file.path.startsWith(path) && file.path !== path)
            folders.push(file.path.substring(path.length));
        
        if(file.path === path)
            files.push(file);
    }

    res.render("files/list", {
        user,
        files,
        folders,
        path,
    });
}));