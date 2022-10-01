const mongoose = require('mongoose')

const mongo_url = 'mongodb://localhost:27017/passport-demo'

const users = [
	{
		name: 'John Doe',
		username: 'johndoe',
		password: 'johndoe'
	},
	{
		name: 'Jane Doe',
		username: 'janedoe',
		password: 'janedoe'
	},
	{
		name: 'John Smith',
		username: 'johnsmith',
		password: 'johnsmith'
	},
]

const user_model = require('./user.model')

mongoose.connect(mongo_url).then(() => {
	console.log('mongodb is connected')
	//user_model.create(users).then(() => console.log('users added'))
}).catch(e => {
	console.log('error in connecting mongodb', e)
	process.exit(1)
})