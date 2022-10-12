//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Router = require('./routes/routes.js')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(morgan('combine'))

// use cors
app.use(cors());

// parse application/json
app.use(bodyParser.json())

//routes
app.use(Router)

app.listen(process.env.PORT || 5001)