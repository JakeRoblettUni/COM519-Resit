module.exports = function(req, res, next) {
    
    res.api = {
        success: function(data) {
            res.json({
                success: true,
                status: 200,
                data
            });
        },
        failure: function(status, message, data = undefined) {
            res.status(status).json({
                success: false,
                status,
                error: message,
                data,
            });
        },
        error: function(error, data = undefined) {
            res.status(500).json({
                success: false,
                status: 500,
                error: error.message,
                data,
            });
        },
    };

    next();
};