const express = require('express')
const router = express.Router()
const NotasSchema = require('../models/nota')

///////////////  OBTENER TODOS LAS NOTAS  /////////////////
router.get('/api/notas', async (req, res) => {
	await NotasSchema.find().then((data) => {
		res.json(data)
	})
})
///////////////  OBTENER UNA NOTA  /////////////////
router.get('/api/nota/:id', async (req, res) => {
	const id = req.params.id
	await NotasSchema.findById(id).then((data) => {
		res.json(data)
	})
})
///////////////  GUARDAR NOTA  /////////////////
router.post('/api/notas', async (req, res) => {
	const { titulo, contenido } = req.body
	try {
		const nota = new NotasSchema({ titulo, contenido })
		await nota.save()
		res.status(200).json(nota)
	} catch (error) {
		res.status(400).json(error.message)
	}
})
///////////////  ACTUALIZAR NOTA  /////////////////
router.put('/api/notas/:id', async (req, res) => {
	const id = req.params.id
	const { titulo, contenido } = req.body
	const notaEditada = { titulo, contenido }
	try {
		await NotasSchema.findByIdAndUpdate(id, notaEditada, {
			new: true,
		}).then((data) => {
			res.status(200).json(data)
		})
	} catch (error) {
		res.status(400).json(error.message)
	}
})
///////////////  BORRAR NOTA  /////////////////

router.delete('/api/notas/:id', async (req, res) => {
	const id = req.params.id
	try {
		await NotasSchema.findOneAndDelete(id).then((data) => {
			res.status(200).json(data)
		})
	} catch (error) {
		res.status(400).json(error.message)
	}
})

module.exports = router
