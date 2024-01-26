const mongoose = require("mongoose");
const { type } = require("os");

const Schema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true}
})

module.exports = {
    UserModel : mongoose.model("user", Schema)
}