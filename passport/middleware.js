function handle_invalid_passport_request(error, req, res, next) {
	console.log('passport error is ', error)
	return res.status(error.status || 500).json(error)
}

function serialize_deserialize_user(user, callback) {
	return callback(null, user)
}

module.exports = {
	serialize_deserialize_user,
	handle_invalid_passport_request,
}