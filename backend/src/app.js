// update the page without restart the server:nodemon
// Look requests: insomnia
// database: sqlite

const express = require('express')
const routes  = require('./routes')
const cors = require('cors')
const { errors } = require('celebrate')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app
