import { Router } from 'express'
import { register } from '../controllers/Usuario/register.js'
import { login } from '../controllers/Usuario/login.js'
import { eliminarUser } from '../controllers/Usuario/eliminar.js'
const userRoutes = Router()

userRoutes.post('/api/register', register)
userRoutes.post('/api/login', login)
userRoutes.post('/api/delete/:username', eliminarUser)

export default userRoutes
