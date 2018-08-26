
const express = require('express')
const app = express()
const path = require('path')
app.use('/src', express.static('src'))
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')))
app.listen(3000, () => console.log('Example app listening on port http://localhost:3000!'))
