import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user.js'
const secretKey = process.env.JWT_SECRET
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Busca el usuario en la base de datos
    const user = await User.findOne({ username: username.trim().toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // Genera un token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '7h'
    })
    res.status(200).json({ token, username: user.username })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}
