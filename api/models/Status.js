const mongoose = require("mongoose");

let StatusSchema = mongoose.Schema({
    userId: String,
    username: String,
    img: String,
    profilePicture: String,
    createdAt: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 1000,
        expire: 1
    }
}, { timestamps: true });

module.exports = mongoose.model("Status", StatusSchema);