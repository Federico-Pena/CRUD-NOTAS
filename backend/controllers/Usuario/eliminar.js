import User from '../../models/user.js'

export const eliminarUser = async (req, res) => {
  try {
    const username = req.params.username
    const user = await User.findOneAndDelete({ username })
    if (user) {
      res.json({ user })
    } else {
      throw new Error()
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}
