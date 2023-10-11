import { hash } from 'bcrypt'
import User from '../../models/user.js'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username.trim() || !password.trim()) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }
    const existingUser = await User.findOne({ username: username.trim().toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' })
    }
    const saltRounds = 10
    const hashedPassword = await hash(password.trim(), saltRounds)

    const newUser = new User({
      username: username.trim().toLowerCase(),
      password: hashedPassword
    })
    await newUser.save()
    res.status(201).json({ message: 'Usuario registrado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
}
