var mongoose = require("mongoose")
var moment = require("moment")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
    post: {
        type: ObjectId,
        ref: "Posts"
    },
    from: {
        type: ObjectId,
        ref: "User"
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: "User"
        },
        to: {
            type: ObjectId,
            ref: "User"
        },
        content: String,
    }],
    content: String,
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

CommentSchema.pre("save", function(next) {
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

CommentSchema.statics = {
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

module.exports = CommentSchema
