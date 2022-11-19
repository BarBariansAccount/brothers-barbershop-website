//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const RouterUser = require('./routes/routes.js')
const RouterResetPassword = require('./routes/ResetPasswordRoutes.js')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(morgan('combine'))

// use cors
app.use(cors());

app.use('/uploads',express.static('uploads'))

// parse application/json
app.use(bodyParser.json())

//routes
app.use(RouterUser)

app.use('/ResetPassword', RouterResetPassword)

app.listen(process.env.PORT || 5001)