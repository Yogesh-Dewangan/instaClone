const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    PostImage: {type: String, require: true},
    author: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true}
})

const postModel = mongoose.model('instapost', postSchema);

module.exports = postModel;