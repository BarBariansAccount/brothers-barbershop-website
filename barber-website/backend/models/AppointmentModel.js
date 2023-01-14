
const getBarberAvailablityDates= "SELECT DISTINCT available_date FROM barber_schedule WHERE UserID=$1 AND Available_Date>=$2"


module.exports={
    getBarberAvailablityDates,

}
