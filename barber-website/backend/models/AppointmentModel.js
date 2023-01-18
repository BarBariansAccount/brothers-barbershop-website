
const getBarberAvailablityDates= "SELECT DISTINCT available_date FROM barber_schedule WHERE UserID=$1 AND Available_Date>=$2"

const getBarberAvailablity_Hours= "SELECT hour,appointment_id FROM barber_schedule WHERE UserID=$1 AND Available_Date=$2 ORDER BY hour";

const addAppointment= "UPDATE barber_schedule SET booked=True, Customer_First_name = $2, Customer_Last_name = $3, Customer_email = $4, Customer_telephone=$5, service=$6, Customer_appointment_notes=$7 WHERE appointment_id = $1";


module.exports={
    getBarberAvailablityDates,
    getBarberAvailablity_Hours,
    addAppointment

}
