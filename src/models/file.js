const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    slug: {
        type: String,
    },
    owner: {
        type: "ObjectId",
        ref: "User",
        required: true,
    },
    directory: {
        type: "ObjectId",
        ref: "Directory",
        required: true,
    },
    description: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("File", schema);