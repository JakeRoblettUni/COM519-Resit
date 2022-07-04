const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

const File = require("../../models/file");

router.post("/files", wrap(async (req, res) => {
    let user = await req.authenticate();

    let name = req.provided.parameter("username", { required: true });
    let path = req.provided.parameter("path", { required: true });

    let file = await File.create({ 
        name, 
        path,
        owner: user._id, 
    });

    res.api.success({ file });
}));