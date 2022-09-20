//Backend Entry point
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")

//database
const db = require('./config/database.js')


const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) =>{
    res.send({
        message: "hello"
    })
})

//routes

//test if the connection has been built
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error'+err))

//app.listen(config.process.env.PORT || 8081)
app.listen(process.env.PORT || 8081)