module.exports = function(callback) {
    return function(req, res, next) {
        callback(req, res)
            .then(() => {})
            .catch((err) => next(err));
    };
};