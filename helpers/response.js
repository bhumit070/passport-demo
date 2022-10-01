function generate_response({ error, data, message, status }) {
	return {
		status: error ? error.status || error.statusCode : status ? status : error ? 500 : 200,
		error: error ? true : false,
		message: error && !message ? String(error) : message ? message : error ? 'Something went wrong' : 'Success',
		data: data || []
	}
}

class Response {
	constructor(res) {
		this.res = res
	}

	send({ error, data, message, status }) {
		const response = generate_response({ error, data, message, status })
		return this.res.status(response.status).json(response)
	}
}

module.exports = {
	generate_response,
	Response
}