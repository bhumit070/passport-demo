const jwt = require('jsonwebtoken')

const { Response } = require('../helpers/response')
const constants = require('../config/constants')
const user_model = require('../mongodb/user.model')

async function login(req, res) {
	const token = jwt.sign({ _id: req.user._id }, constants.JWT_SECRET, { expiresIn: '1h' })
	await user_model.updateOne({ _id: req.user._id }, { token })
	req.user.token = token
	return res.status(200).json({
		message: 'Login successful 🎉', data: {
			user: req.user
		}
	})
}

function dashboard(req, res) {
	return new Response(res).send({
		message: 'Welcome to dashboard 🎉', data: {
			user: req.user
		}
	})
}

function not_found(req, res, next) {
	new Response(res).send({ error: true, status: 404, message: 'Route not found.' })
}

module.exports = {
	login,
	dashboard,
	not_found
}