function google_strategy_validator(request, issuer, profile, callback) {
	return callback(null, profile)
}

module.exports = google_strategy_validator