const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const NotasSchema = new Schema(
	{
		titulo: String,
		contenido: String,
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('notas', NotasSchema)
