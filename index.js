import './backend/database.js'
import notasRoutes from './backend/routes/notas.routes.js'
import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import userRoutes from './backend/routes/user.routes.js'
import authMiddleware from './backend/Middleware/authMiddleware.js'
import { setCache } from './backend/Middleware/cache.js'
const PORT = process.env.PORT || 4000

const app = express()
const optionsCors = {
  origin: ['https://tareas-finanzas.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}
app.disable('x-powered-by')
app.use(setCache)
app.use(express.json())
app.use(cors(optionsCors))
app.use(express.static(resolve('./frontend', 'dist')))
app.use(userRoutes)
app.use(authMiddleware)
app.use(notasRoutes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})
