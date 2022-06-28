const express = require("express");
const { HttpError } = require("../../utils/errors");
const router = express.Router();
module.exports = router;

router.use(require("./auth"));

router.get("/", (req, res) => {
    res.render("index");
});

router.all("*", (req, res) => {
    throw new HttpError(404, "Page not found");
});

router.use((err, req, res, next) => {
    if (err.httpStatus) {
        if (err.httpStatus === 401) {
            return res.redirect("/login");
        }

        res.status(err.httpStatus);
        res.render("error", {
            status: err.httpStatus,
            error: err.message,
            stack: err.stack,
        });
        return;
    }

    res.status(500);
    res.render("error", {
        status: 500,
        error: "Internal server error",
        stack: err.stack,
    });

    console.error(`Uncaught error for frontend endpoint: ${req.originalUrl}`);
    console.error(err);
});