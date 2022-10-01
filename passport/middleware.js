function handle_invalid_passport_request(error, req, res, next) {
	console.log('passport error is ', error)
	return res.status(error.status || 500).json(error)
}

module.exports = {
	handle_invalid_passport_request
}