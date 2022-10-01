const user_model = require('../mongodb/user.model')
const bcrypt = require('bcryptjs')
const response_helpers = require('../helpers/response')

async function validate_local_strategy(username, password, callback) {
	try {
		// I am not getting any wat to find extra properties in the username property.
		// so here is the patch for that 😅.
		// we can send JSON like below from frontend and then we can parse it in backend.
		//{
		//	"username": "{ \"username\": \"bhoomit\" }",
		//		"password": "bhoomit"
		//}
		// and after parsing username we can have extra fields like username,phone_number, etc.
		username = JSON.parse(username)

		if (!username || !password) {
			return callback(response_helpers.generate_response({ error: true, message: 'username & password are required.', status: 400 }), null)
		}

		const user = await user_model.findOne({ username: username.username }).lean()

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