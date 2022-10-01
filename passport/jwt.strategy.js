const jwt = require('jsonwebtoken')

const user_model = require('../mongodb/user.model')
const response_helpers = require('../helpers/response')

const constants = require('../config/constants')

async function bearer_strategy_validator(bearer_token, callback) {
	try {

		const decoded_token = jwt.verify(bearer_token, constants.JWT_SECRET)
		const user = await user_model.findById(decoded_token._id).lean()

		if (!user) {
			return callback(response_helpers.generate_response({ status: 400, message: 'User not found.', error: true }), null)
		}

		if (user.token !== bearer_token) {
			return callback(response_helpers.generate_response({ status: 400, message: 'Session has expired', error: true }), null)
		}

		return callback(null, user)
	} catch (error) {
		return callback(response_helpers.generate_response({ status: error.status, error }), null)
	}
}

module.exports = bearer_strategy_validator