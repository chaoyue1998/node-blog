var mongoose = require("mongoose")
var Schema = mongoose.Schema
var moment = require("moment")
var bcrypt = require("bcrypt")
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	name: {
		required: true,
		type: String,
		unique: true
	},
	password: {
		required: true,
		type: String
	},
	info: {
		posted: {
			type: String,
			default: moment().format('lll')
		},
		updateAt: {
			type: String,
			default: moment().format('lll')
		}
	},
	role: {
		type: Number,
		default: 0
			//0 nomal user
			//10 < admin
			//50 < super admin
	}
})

UserSchema.pre("save", function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	if (this.isNew) {
		this.info.posted = this.info.updateAt = moment().format('lll')
	} else {
		this.info.updateAt = moment().format('lll')
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

UserSchema.methods = {
	comparePassword: function(password, cb) {
		bcrypt.compare(password, this.password, function(err, isMatch) {
			if (err) {
				return cb(err)
			}
			cb(null, isMatch)
		});
	}
}


UserSchema.statics = {
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

module.exports = UserSchema
