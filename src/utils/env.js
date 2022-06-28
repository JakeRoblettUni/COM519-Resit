require("dotenv").config();

function env(key, fallback=undefined) {
    let value = process.env[key];

    if(!value) {
        if(fallback !== undefined)
            return fallback;

        throw new Error(`Missing required environment variable ${key}`);
    }

    return value;
}

module.exports = {
    PORT: env("PORT"),
};