require('dotenv').config()
require('./mongodb/index')

const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const express_session = require('express-session')

const routes = require('./routes')
const constants = require('./config/constants')
const passport = require('./passport')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express_session({ secret: constants.EXPRESS_SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(routes)
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 6001

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
});