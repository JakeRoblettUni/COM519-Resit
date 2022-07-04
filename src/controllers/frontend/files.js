const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const wrap = require("../../utils/wrap");
const { HttpError } = require("../../utils/errors");
const router = express.Router();
module.exports = router;

const File = require("../../models/file");

router.use(fileUpload());

router.get(["/files", "/files/*"], wrap(async (req, res) => {
    let user = await req.authenticate();
    let path = req.params[0] || "";

    if(!path.startsWith("/"))
        path = "/" + path;

    let allFiles = await File.find({ owner: user._id });

    let files = [];
    let folders = [];

    for(let file of allFiles) {
        
        if(file.path === path) {
            files.push(file);
            continue;
        }
        
        if(file.path.startsWith(path)) {
            let pathPart = path === "/"
                  ? "/" + file.path.substring(path.length).split("/")[0]
                  : "/" + file.path.substring(path.length + 1).split("/")[0]

            if(!folders.includes(pathPart)) {
                folders.push(pathPart);
            }
        }

    }

    res.render("files/list", {
        user,
        files,
        folders,
        path,
    });
}));

router.get("/file/:id", wrap(async (req, res) => {
    let user = await req.authenticate();

    let file = await File.findById(req.params.id);

    if(!file)
        throw new HttpError(404, "File not found");

    if(!file.owner.equals(user._id))
        throw new HttpError(403, "You do not have permission to access this file");

    res.render("files/view", {
        user, file
    });
}));

router.get("/file/:id/download", wrap(async (req, res) => {
    let user = await req.authenticate();

    let file = await File.findById(req.params.id);

    if(!file)
        throw new HttpError(404, "File not found");

    if(!file.owner.equals(user._id))
        throw new HttpError(403, "You do not have permission to access this file");

    let filepath = `./data/${file._id}`;

    if(!fs.existsSync(filepath))
        throw new HttpError(404, "File no longer exists on the server, it may have been lost or deleted on the storage medium");

    res.attachment(file.name);
    fs.createReadStream(filepath).pipe(res);
}));

router.get("/upload-file", wrap(async (req, res) => {
    let user = await req.authenticate();
    res.render("files/upload", { user, path: req.query.path });
}));

router.post("/upload-file", wrap(async (req, res) => {
    let user = await req.authenticate();

    let name = req.provided.parameter("name", { required: true });
    let path = req.provided.parameter("path", { required: true });
    let description = req.provided.parameter("description", {});

    let file = req.files?.file;

    if(!file)
        throw new HttpError(400, "No file was uploaded");

    let fileObj = await File.create({
        name,
        path,
        description,
        owner: user._id,
    });

    if(!fs.existsSync("./data")) {
        fs.mkdirSync("./data");
    }

    await fs.promises.writeFile(`./data/${fileObj._id}`, file.data);

    res.redirect(`/file/${fileObj._id}`);
}));