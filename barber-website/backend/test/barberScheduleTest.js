const {
    addAvaliblilty,
    getBarberAvailablity_barberView,
    deleteBarberSchedule
} = require("../controllers/BarberSchedule")

const { assert } = require('chai')
const { mockRequest, mockResponse, sleep } = require('./commonTestingMethods')

