const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.URL_DB

const DB = mongoose
	.connect(uri)
	.then(() => console.log(`Conectad a la BD ${mongoose.connection.name}`))

module.exports = DB
