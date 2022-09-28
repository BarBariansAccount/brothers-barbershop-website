//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Router = require('./routes/routes.js')

const app = express()
app.use(morgan('combine'))
app.use(express.json())

//routes
app.use(Router)

app.listen(process.env.PORT || 8081)