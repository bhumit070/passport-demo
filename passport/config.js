const default_config = {
	session: false,
	failWithError: true
}

const google_login_config = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://localhost:6001/login/google/callback',
	scope: ['profile', 'email'],
	passReqToCallback: true
}

module.exports = {
	default_config,
	google_login_config
}