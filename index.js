import './backend/database.js'
import notasRoutes from './backend/routes/notas.routes.js'
import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import userRoutes from './backend/routes/user.routes.js'
import authMiddleware from './backend/Middleware/authMiddleware.js'
const PORT = process.env.PORT || 4000

const app = express()
const optionsCors = {
  origin: ['https://crud-notas.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}
app.use(express.json())
app.use(cors(optionsCors))
app.use(userRoutes)
app.use(express.static(resolve('./frontend', 'dist')))
app.use(authMiddleware)
app.use(notasRoutes)
app.use('*', (req, res) => {
  res.sendFile(resolve('./backend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})
