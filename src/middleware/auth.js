const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../utils/env");
const { HttpError } = require("../utils/errors");
const User = require("../models/user");

module.exports = function(req, res, next) {
    
    req.authenticate = async function(opts = {}) {
        let token = null;

        if(req.cookies.token) {
            token = req.cookies.token;
        }

        if(req.headers.authorization) {
            let header = req.headers.authorization;

            if(!header.startsWith("Bearer")) {
                throw new HttpError(401, "Authorization must use a bearer token");
            }

            token = header.substring(7);
        }

        if(!token) {
            if(opts.optional)
                return null;

            throw new HttpError(401, "No authorization was provided");
        }

        let payload;
        try {
            payload = jwt.verify(token, env.JWT_SECRET);
        } catch(err) {
            throw new HttpError(401, "Invalid or expired token");
        }

        let userId = payload.userId;

        if(!userId) {
            throw new HttpError(401, "Malformed token payload, a new token should be requested");
        }

        let user = await User.findById(userId).populate("passwordHash");

        if(!user) {
            throw new HttpError(401, "User is invalid or the account no longer exists");
        }

        user.passwordHash = undefined;

        return user;
    };

    res.login = async function(identifier, password) {
        let user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier },
            ],
        }).populate("passwordHash");

        if (!user) {
            throw new HttpError(400, "An account with that username or email address does not exist");
        }

        if (!await bcrypt.compare(password, user.passwordHash)) {
            throw new HttpError(400, "Password is incorrect");
        }

        // Prevents password hash from being sent back to the user
        user.passwordHash = undefined;

        let token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
        });

        return { user, token };
    }

    res.register = async function(username, email, password) {
        try {
            let user = await User.create({
                username,
                email,
                passwordHash: await bcrypt.hash(password, env.BCRYPT_ROUNDS),
            });

            return user;
        } catch(err) {
            switch(err.code) {
                case 11000:
                    if(err.keyPattern.username) {
                        throw new HttpError(400, "An account with that username already exists");
                    } else if(err.keyPattern.email) {
                        throw new HttpError(400, "An account with that email address already exists");
                    }
            }

            throw err;
        }
    }

    res.logout = function() {
        res.clearCookie("token");
    }

    next();
}