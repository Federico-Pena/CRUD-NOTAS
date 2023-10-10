import { Router } from 'express'
const notasRoutes = Router()
import NotasSchema from '../models/nota.js'

///////////////  OBTENER TODOS LAS NOTAS  /////////////////
notasRoutes.get('/api/notas', async (req, res) => {
  try {
    const notas = await NotasSchema.find().sort({ createdAt: -1 })
    res.json({ data: notas })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener las notas' })
  }
})
///////////////  OBTENER UNA NOTA  /////////////////
notasRoutes.get('/api/nota/:id', async (req, res) => {
  try {
    const id = req.params.id
    const nota = await NotasSchema.findById(id)
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' })
    }
    res.json({ data: nota })
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al obtener la nota' })
  }
})
///////////////  GUARDAR NOTA  /////////////////
notasRoutes.post('/api/notas', async (req, res) => {
  try {
    const { titulo, contenido } = req.body
    const nota = new NotasSchema({ titulo, contenido })
    const response = await nota.save()
    if (response) {
      return res.status(200).json({ data: response })
    } else {
      throw new Error('error')
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al guardar la nota' })
  }
})
///////////////  ACTUALIZAR NOTA  /////////////////
notasRoutes.put('/api/notas/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { titulo, contenido, completada } = req.body
    const notaEditada = { titulo, contenido, completada }
    const nota = await NotasSchema.findByIdAndUpdate(id, notaEditada, {
      new: true
    })
    if (!nota) {
      return res.status(404).json({ error: 'Nota para editar no encontrada' })
    }
    return res.status(200).json({ data: nota })
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al editar la nota' })
  }
})
///////////////  BORRAR NOTA  /////////////////

notasRoutes.delete('/api/notas/:id', async (req, res) => {
  try {
    const id = req.params.id
    const nota = await NotasSchema.findOneAndDelete(id)
    if (!nota) {
      return res.status(404).json({ error: 'Nota para eliminar no encontrada' })
    }
    return res.status(200).json({ data: nota })
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al eliminar la nota' })
  }
})

export default notasRoutes
