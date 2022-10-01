require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const routes = require('./routes')

require('./mongodb/index')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 6001

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})