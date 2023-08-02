const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4000

app.use(require('./routes/notas.routes'))
app.use(express.static(path.join(__dirname, '/dist')))
console.log(__dirname)
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}/`)
})
