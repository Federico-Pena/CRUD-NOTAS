import NotasSchema from '../../models/nota.js'

export const obtenerNotas = async (req, res) => {
  const id = req.user.userId
  try {
    const notas = await NotasSchema.find({ usuario: id }).sort({ createdAt: -1 })
    res.json({ data: notas })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener las notas' })
  }
}
