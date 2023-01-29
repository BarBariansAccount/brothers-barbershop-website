
const getBarberAvailablityDates = "SELECT DISTINCT available_date FROM barber_schedule WHERE UserID=$1 AND Available_Date>=$2"

const getBarberAvailablity_Hours = "SELECT hour,appointment_id,booked FROM barber_schedule WHERE UserID=$1 AND Available_Date=$2 ORDER BY hour";

const addAppointment = "UPDATE barber_schedule SET booked=True, Customer_First_name = $2, Customer_Last_name = $3, Customer_email = $4, Customer_telephone=$5, service=$6, Customer_appointment_notes=$7 WHERE appointment_id = $1";

//ME added for Update an appointment 
const updateAppointment = "UPDATE barber_schedule SET booked=True, Customer_First_name = $2, Customer_Last_name = $3, Customer_email = $4, Customer_telephone=$5, Customer_appointment_notes=$6 WHERE appointment_id = $1";

const getAllBarbers = "SELECT UserID, FirstName, LastName, picturelink FROM users WHERE UserRole='Barber'"

const customerAppointmentDetails = "SELECT  barber_name, Available_Date, hour, Customer_First_name, Customer_Last_name, Customer_email, Customer_telephone, service, Customer_appointment_notes FROM barber_schedule WHERE appointment_id =$1"

const cancelAppointment = "UPDATE barber_schedule SET booked=False, Customer_First_name = '', Customer_Last_name = '', Customer_email = '', Customer_telephone='', Customer_appointment_notes='' WHERE appointment_id = $1"
//Me added for checking booked or not an appointmnet 
const isBooked = "SELECT booked FROM barber_schedule WHERE appointment_id = $1 AND booked=True"

module.exports = {
    getBarberAvailablityDates,
    getBarberAvailablity_Hours,
    addAppointment,
    getAllBarbers,
    customerAppointmentDetails,
    cancelAppointment,
    isBooked,
    updateAppointment
}
