import NotasSchema from '../../models/nota.js'

export const borrarNota = async (req, res) => {
  try {
    const id = req.params.id
    const nota = await NotasSchema.findByIdAndDelete(id)
    if (!nota) {
      return res.status(404).json({ error: 'Nota para eliminar no encontrada' })
    }
    console.log(id)
    return res.status(200).json({ data: nota })
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al eliminar la nota' })
  }
}
