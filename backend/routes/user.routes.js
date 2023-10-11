import { Router } from 'express'
import { register } from '../controllers/Usuario/register.js'
import { login } from '../controllers/Usuario/login.js'
const userRoutes = Router()

userRoutes.post('/api/register', register)

userRoutes.post('/api/login', login)

export default userRoutes
