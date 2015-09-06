var mongoose = require("mongoose")
var PostsSchema = require("../schemas/posts")
var Posts = mongoose.model("Posts", PostsSchema)

module.exports = Posts
