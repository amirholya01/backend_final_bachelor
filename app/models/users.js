const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    roles: {type: [String], default: ["USER"]},
    token: {type: String, default: ""},
    courses: {type: [mongoose.Types.ObjectId], default: [], ref: "course"}
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    UserModel : mongoose.model("user", Schema)
}