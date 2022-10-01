const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const users_schema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profile_image: {
		type: String,
		default: null
	},
	token: {
		type: String,
		default: null
	}
}, {
	timestamps: true
})

users_schema.pre('save', async function (next) {
	this.password = await bcrypt.hashSync(this.password, 10)
	return next()
})

module.exports = model('users', users_schema)