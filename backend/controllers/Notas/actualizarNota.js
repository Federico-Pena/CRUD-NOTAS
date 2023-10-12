import NotasSchema from '../../models/nota.js'

export const actualizarNota = async (req, res) => {
  try {
    const id = req.params.id
    const { titulo, tareas } = req.body
    const notaEditada = { titulo, tareas }
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
}
