const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true,
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("User", schema);