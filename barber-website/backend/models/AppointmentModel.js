
const getBarberAvailablityDates= "SELECT DISTINCT available_date FROM barber_schedule WHERE UserID=$1 AND Available_Date>=$2"

const getBarberAvailablity_Hours= "SELECT hour,appointment_id FROM barber_schedule WHERE UserID=$1 AND Available_Date=$2 ORDER BY hour"


module.exports={
    getBarberAvailablityDates,
    getBarberAvailablity_Hours

}
