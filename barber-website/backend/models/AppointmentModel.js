
const getBarberAvailablityDates= "SELECT DISTINCT available_date FROM barber_schedule WHERE UserID=$1 AND Available_Date>=$2"

const getBarberAvailablity_Hours= "SELECT hour FROM barber_schedule WHERE UserID=$1 AND Available_Date=$2"


module.exports={
    getBarberAvailablityDates,
    getBarberAvailablity_Hours

}
