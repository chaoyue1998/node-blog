var mongoose = require("mongoose")
var moment = require("moment")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
    name: String,
    des: String,
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

CategorySchema.pre("save", function(next) {
    if (this.isNew) {
        this.info.posted = this.info.updateAt = moment().format('lll')
    } else {
        this.info.updateAt = moment().format('lll')
    }
    next()
})

CategorySchema.statics = {
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

module.exports = CategorySchema
