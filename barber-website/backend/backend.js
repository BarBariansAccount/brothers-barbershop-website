//Backend Entry point
const express = require("express")
const morgan = require("morgan")
const Usersrouter = require('./routes/UsersRoutes.js')
const FAQrouter = require('./routes/FAQRoutes.js')
const BusyStatusrouter = require('./routes/BusyStatusRoutes.js')
const AppointmentRoutes = require('./routes/AppointmentRoutes.js')

const ResetPasswordRoutes = require('./routes/ResetPasswordRoutes.js')
const BarberScheduleRoutes = require('./routes/BarberScheduleRoutes.js')

const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(morgan('tiny'))

// use cors
app.use(cors());

app.use('/uploads', express.static('uploads'))

// parse application/json
app.use(bodyParser.json())

//routes
app.use('/User', Usersrouter)
app.use('/FAQ', FAQrouter)
app.use('/BusyStatus', BusyStatusrouter)
app.use('/resetPassword', ResetPasswordRoutes)
app.use('/BarberSchedule', BarberScheduleRoutes)
app.use('/Appointment', AppointmentRoutes)


app.listen(process.env.PORT || 5001)