import NotasSchema from '../../models/nota.js'

export const crearNota = async (req, res) => {
  try {
    const { titulo, tareas } = req.body
    const id = req.user.userId

    const nota = new NotasSchema({
      titulo,
      usuario: id,
      tareas
    })
    const data = await nota.save()
    if (data) {
      return res.status(200).json({ data })
    } else {
      throw new Error('error')
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al guardar la nota' })
  }
}
