const user_model = require('../mongodb/user.model')
const bcrypt = require('bcryptjs')
const response_helpers = require('../helpers/response')

async function validate_local_strategy(username, password, callback) {
	try {

		if (!username || !password) {
			return callback(response_helpers.generate_response({ error: true, message: 'username & password are required.', status: 400 }), null)
		}

		const user = await user_model.findOne({ username }).lean()

		if (!user) {
			return callback(response_helpers.generate_response({ error: true, status: 404, message: 'User not found.' }), null)
		}

		const is_valid = await bcrypt.compareSync(password, user.password)

		if (!is_valid) {
			return callback(response_helpers.generate_response({ error: true, status: 400, message: 'Given password is invalid.' }), null)
		}

		return callback(null, user)
	} catch (error) {
		return callback(error, null)
	}
}

module.exports = validate_local_strategy