const { HttpError } = require("../utils/errors");

module.exports = function(req, res, next) {
    
    req.provided = {
        parameter: function(key, opts = {}) {
            let value = req.body[key];
            
            if(value === null || value === undefined || value === "") {
                if(opts.required === true) {
                    throw new HttpError(400, `Missing required parameter "${key}"`);
                } else {
                    return null;
                }
            }

            if(opts.type === "integer") {
                try {
                    value = parseInt(value);
                } catch(err) {
                    throw new HttpError(400, `Parameter "${key}" must be a valid integer`);
                }
            }

            if(opts.type === "float") {
                try {
                    value = parseFloat(value);
                } catch (err) {
                    throw new HttpError(400, `Parameter "${key}" must be a valid number`);
                }
            }
            
            if(opts.min !== null && opts.min !== undefined) {
                if(value < opts.min) {
                    throw new HttpError(400, `Parameter "${key}" must be at least ${opts.min}`);
                }
            }

            if(opts.max !== null && opts.max !== undefined) {
                if(value > opts.max) {
                    throw new HttpError(400, `Parameter "${key}" must be at most ${opts.max}`);
                }
            }
            
            return value;
        },
    };

    next();
};