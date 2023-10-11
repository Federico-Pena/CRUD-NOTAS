import { Router } from 'express'
import NotasSchema from '../models/nota.js'
import { obtenerNotas } from '../controllers/Notas/obtenerNotas.js'
import { crearNota } from '../controllers/Notas/crearNota.js'
import { actualizarNota } from '../controllers/Notas/actualizarNota.js'
import { borrarNota } from '../controllers/Notas/borrarNota.js'

const notasRoutes = Router()
/* OBTENER TODOS LAS NOTAS */
notasRoutes.get('/api/notas', obtenerNotas)
/*  OBTENER UNA NOTA  */
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
/* GUARDAR NOTA */
notasRoutes.post('/api/notas', crearNota)
/*  ACTUALIZAR NOTA  */
notasRoutes.put('/api/notas/:id', actualizarNota)
/* BORRAR NOTA */
notasRoutes.delete('/api/notas/:id', borrarNota)

export default notasRoutes
