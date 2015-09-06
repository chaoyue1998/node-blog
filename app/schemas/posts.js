var mongoose = require("mongoose")
var moment = require("moment")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var PostsSchema = new Schema({
    title: String,
    poster: String,
    author: {
        type: String,
    },
    content: String,
    category: [{
        type: ObjectId,
        ref: "Category"
    }],
    info: {
        posted: {
            type: String,
            default: moment().format('lll')
        },
        updateAt: {
            type: String,
            default: moment().format('lll')
        }
    }
})

PostsSchema.pre("save", function(next) {
    if (this.isNew) {
        this.info.posted = this.info.updateAt = moment().format('lll')
    } else {
        this.info.updateAt = moment().format('lll')
    }
    if (this.author === "") {
        this.author = this.author.delault
    };
    next()
})

PostsSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort("info.updateAt")
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
}

module.exports = PostsSchema
