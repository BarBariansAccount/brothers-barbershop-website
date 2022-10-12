//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Router = require('./routes/routes.js')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('combine'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routes
app.use(Router)

app.listen(process.env.PORT || 5001)