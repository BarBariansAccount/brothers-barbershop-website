//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Usersrouter = require('./routes/UsersRoutes.js')
const FAQrouter = require('./routes/FAQRoutes.js')
const BSrouter = require('./routes/BSRoutes.js')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(morgan('combine'))

// use cors
app.use(cors());

app.use('/uploads', express.static('uploads'))

// parse application/json
app.use(bodyParser.json())

//routes
app.use(Usersrouter)
app.use(FAQrouter)
app.use(BSrouter)
app.listen(process.env.PORT || 5001)