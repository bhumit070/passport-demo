const passport = require('passport')
const local_strategy = require('passport-local')
const jwt_token_strategy = require('passport-http-bearer')
const google_strategy = require('passport-google-oidc') // oidc stands for open id connect ?

const local_strategy_validator = require('./local.strategy')
const bearer_strategy_validator = require('./jwt.strategy')

passport.use(new local_strategy(local_strategy_validator))
passport.use(new jwt_token_strategy(bearer_strategy_validator))

passport.use(passport.initialize());
passport.use(passport.session())

passport.serializeUser((user, callback) => {
	try {
		callback(null, user)
	} catch (error) {
		callback(error, null)
	}
})

passport.deserializeUser((user, callback) => {
	try {
		callback(null, user)
	} catch (error) {
		callback(error, null)
	}
})

passport.use(new google_strategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://localhost:6001/login/google/callback',
	scope: ['profile', 'email'],
	passReqToCallback: true
}, validate_google_login))

function validate_google_login(request, issuer, profile, callback) {
	return callback(null, profile)
}

module.exports = passport