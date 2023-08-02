require('./backend/database.js')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(express.json())
app.use(cors({ origin: '*' }))
const PORT = process.env.PORT || 4000

app.use(require('./backend/routes/notas.routes'))
app.use(express.static(path.resolve('./backend', 'dist')))
app.use('*', (req, res) => {
	res.sendFile(path.resolve('./backend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}/`)
})
