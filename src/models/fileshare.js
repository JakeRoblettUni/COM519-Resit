const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    file: { 
        type: "ObjectId",
        ref: "File",
        required: true,
    },
    owner: {
        type: "ObjectId",
        ref: "User",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("FileShare", schema);