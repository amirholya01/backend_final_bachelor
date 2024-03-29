const mongoose = require("mongoose");

const Episodes = mongoose.Schema({
    title:{type: String, required: true},
    text:{type: String, required: true},
    type:{type: String, default: ""},
    time:{type: String, required: true}
})

const Chapter =  mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [Episodes], default: []}
})

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    // short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [], default: []},
    likes: {type: [], default: []},
    dislikes: {type: [], default: []},
    bookmarks: {type: [], default: []},
    // price: {type: Number, default: 0},
    // discount: {type: Number, default: 0},
    // type: {type: String, default: "free", required: true},
    time: {type: String, default: "00.00.00"},
    teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapters: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], ref: "user", default: []}
})

CourseSchema.index({title: "text", short_text: "text", text: "text"})
module.exports = {
    CourseModel : mongoose.model("course", CourseSchema)
}