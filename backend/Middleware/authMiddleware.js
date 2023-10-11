import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
const secretKey = process.env.JWT_SECRET
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'No hay token, autorización denegada' })
  }
  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' })
  }
}

export default authMiddleware
