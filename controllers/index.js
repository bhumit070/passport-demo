const jwt = require('jsonwebtoken')

const { Response } = require('../helpers/response')
const constants = require('../config/constants')
const user_model = require('../mongodb/user.model')

async function login(req, res) {
	try {
		const token = jwt.sign({ _id: req.user._id }, constants.JWT_SECRET, { expiresIn: '1h' })
		await user_model.updateOne({ _id: req.user._id }, { token })
		req.user.token = token
		return new Response(res).send({ message: 'Login successful 🎉', data: { user: req.user } })
	} catch (error) {
		return new Response(res).send({ error: error, status: 500, message: 'Internal server error.' })
	}
}

async function google_login(req, res) {
	try {
		const google_user = req.user
		const email = req.user.emails[0].value
		let user = await user_model.findOne({ email })
		if (!user) {
			// TODO: need to get user's profile image
			// TODO: find a better way to generate username
			user = await user_model.create({
				name: google_user.displayName,
				email,
				username: `${google_user.name.givenName}${google_user.name.familyName}${Date.now()}`
			})
		}

		const token = jwt.sign({ _id: user._id }, constants.JWT_SECRET, { expiresIn: '1h' })
		await user_model.updateOne({ _id: user._id }, { token })
		user.token = token
		return new Response(res).send({ message: 'Login successful 🎉', data: { user } })
	} catch (error) {
		console.log('google login error is ', error)
		return new Response(res).send({ error: error, status: 500, message: 'Google login failed please try again later.' })
	}
}

async function logout(req, res,) {
	try {
		await user_model.updateOne({ _id: req.user._id }, { token: null })
		return new Response(res).send({ message: 'Logout successful 🎉' })
	} catch (error) {
		return new Response(res).send({ error: error, status: 500, message: 'Internal server error.' })
	}
}

function dashboard(req, res) {
	console.log('req.user is ', req.user)
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
	logout,
	dashboard,
	not_found,
	google_login,
}