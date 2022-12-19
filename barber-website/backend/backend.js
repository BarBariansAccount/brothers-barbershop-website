//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Usersrouter = require('./routes/UsersRoutes.js')
const FAQrouter = require('./routes/FAQRoutes.js')
const BusyStatusrouter = require('./routes/BusyStatusRoutes.js')

const ResetPasswordRoutes = require('./routes/ResetPasswordRoutes.js')
const BarberScheduleRoutes = require('./routes/BarberScheduleRoutes.js')

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
app.use('/resetPassword',ResetPasswordRoutes)
app.use('/BarberSchedule',BarberScheduleRoutes)
app.use(Usersrouter)
app.use(FAQrouter)
app.use(BusyStatusrouter)
app.listen(process.env.PORT || 5001)