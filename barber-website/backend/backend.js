//Backend Entry point
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")

const Router = require('./routes/routes.js')

//database
const db = require('./config/database.js')
const { route } = require("./routes/routes.js")


const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())


//routes
app.use(Router)

//test if the connection has been built
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error'+err))

//app.listen(config.process.env.PORT || 8081)
app.listen(process.env.PORT || 8081)