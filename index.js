import './backend/database.js'
import notasRoutes from './backend/routes/notas.routes.js'
import express from 'express'
const app = express()
import cors from 'cors'
import { resolve } from 'path'
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173', 'https://crud-notas.vercel.app'] }))
const PORT = process.env.PORT || 4000

app.use(notasRoutes)
app.use(express.static(resolve('./frontend', 'dist')))
app.use('*', (req, res) => {
  res.sendFile(resolve('./backend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})
