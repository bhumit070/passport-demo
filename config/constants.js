const PASSPORT_STRATEGIES = {
	LOCAL: 'local',
	JWT_TOKEN: 'bearer',
	GOOGLE: 'google'
}

const JWT_SECRET = '^7d�.f\x0FJ\x1BPC'

const EXPRESS_SESSION_SECRET = 'express_session_secret'

module.exports = {
	JWT_SECRET,
	PASSPORT_STRATEGIES,
	EXPRESS_SESSION_SECRET,
}