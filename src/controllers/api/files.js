const express = require("express");
const wrap = require("../../utils/wrap");
const router = express.Router();
module.exports = router;

const File = require("../../models/file");

router.post("/files/upload", wrap(async (req, res) => {
    let user = await req.authenticate();



    res.api.success({ file });
}));