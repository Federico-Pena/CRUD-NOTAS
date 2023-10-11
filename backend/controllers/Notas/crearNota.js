import NotasSchema from '../../models/nota.js'
import User from '../../models/user.js'

export const crearNota = async (req, res) => {
  try {
    const { titulo, contenido } = req.body
    const id = req.user.userId
    const usuario = await User.findById(id)
    const nota = new NotasSchema({
      titulo,
      contenido,
      usuario: id,
      nombreUsuario: usuario.username
    })
    const data = await nota.save()
    if (data) {
      console.log(data)
      return res.status(200).json({ data })
    } else {
      throw new Error('error')
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al guardar la nota' })
  }
}
