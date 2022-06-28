const express = require("express");
const router = express.Router();
module.exports = router;

router.use(require("../../middleware/api"));
router.use(require("../../middleware/auth"));
router.use(require("../../middleware/provided"));

router.use(require("./auth"));

router.use((err, req, res, next) => {
    if(err.httpStatus) {
        res.api.failure(err.httpStatus, err.message);
        return;
    }
    
    res.api.failure(500, "Internal server error");

    console.error(`Uncaught error for API endpoint: ${req.originalUrl}`);
    console.error(err);
});