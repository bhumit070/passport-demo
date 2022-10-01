const router = require('express').Router()

const constants = require('../config/constants')
const passport = require('../passport')
const passport_config = require('../passport/config')
const passport_middlewares = require('../passport/middleware')

const controllers = require('../controllers')

// normal login
router.route('/login').post(passport.authenticate(constants.PASSPORT_STRATEGIES.LOCAL, passport_config.default_config), controllers.login, passport_middlewares.handle_invalid_passport_request)

// google login
router.route('/login/google').get(passport.authenticate(constants.PASSPORT_STRATEGIES.GOOGLE))
router.route('/login/google/callback').get(passport.authenticate(constants.PASSPORT_STRATEGIES.GOOGLE), controllers.google_login, passport_middlewares.handle_invalid_passport_request)

// dashboard
router.route('/dashboard').get(passport.authenticate(constants.PASSPORT_STRATEGIES.JWT_TOKEN, passport_config.default_config), controllers.dashboard, passport_middlewares.handle_invalid_passport_request)

// logout
router.route('/logout').get(passport.authenticate(constants.PASSPORT_STRATEGIES.JWT_TOKEN), controllers.logout, passport_middlewares.handle_invalid_passport_request)


router.use(controllers.not_found)
module.exports = router