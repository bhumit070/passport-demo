const passport = require('passport')
const local_strategy = require('passport-local')
const jwt_token_strategy = require('passport-http-bearer')

const local_strategy_validator = require('./local.strategy')
const bearer_strategy_validator = require('./jwt.strategy')

passport.use(new local_strategy(local_strategy_validator))
passport.use(new jwt_token_strategy(bearer_strategy_validator))

module.exports = passport