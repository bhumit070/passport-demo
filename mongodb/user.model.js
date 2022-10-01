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
		unique: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: {
			validator: function (email) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
			}
		},
		default: null
	},
	password: {
		type: String,
		required: false
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
	this.password && (this.password = await bcrypt.hashSync(this.password, 10))
	return next()
})

module.exports = model('users', users_schema)