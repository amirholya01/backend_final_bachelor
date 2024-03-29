const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    short_desc: {type: String, required: true},
    total_desc: {type: String, required: true},
    images: {type: [String], default: []},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, required: true},
    comments: {type: [mongoose.Types.ObjectId], default: []},
    like: {type: [mongoose.Types.ObjectId], default: []},
    dislike: {type: [mongoose.Types.ObjectId], default: []},
    bookmark: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    // time: {type: String},
    format: {type: String},
    teacher: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = {
    ProductModel : mongoose.model("product", Schema)
}