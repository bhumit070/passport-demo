const passport = require('passport')
const local_strategy = require('passport-local')
const facebook_strategy = require('passport-facebook')
const google_strategy = require('passport-google-oidc') // oidc stands for open id connect ?
const jwt_token_strategy = require('passport-http-bearer')

const local_strategy_validator = require('./local.strategy')
const bearer_strategy_validator = require('./jwt.strategy')
const google_strategy_validator = require('./google.strategy')
const passport_middlewares = require('./middleware')
const passport_config = require('./config')

function verify_facebook_login(accessToken, refreshToken, profile, callback) {
	console.log('accessToken :>> ', accessToken);
	console.log("refereshToken", refreshToken);
	console.log('profile :>> ', profile);
	callback(null, profile)
}

passport.use(new local_strategy(local_strategy_validator))
passport.use(new jwt_token_strategy(bearer_strategy_validator))
passport.use(new google_strategy(passport_config.google_login_config, google_strategy_validator))
passport.use(new facebook_strategy(passport_config.facebook_login_config, verify_facebook_login))

passport.use(passport.initialize());
passport.use(passport.session())

passport.serializeUser(passport_middlewares.serialize_deserialize_user)
passport.deserializeUser(passport_middlewares.serialize_deserialize_user)


module.exports = passport