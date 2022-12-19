const checkAvailablityExists= "Select appointment_id FROM barber_schedule Where barber_name=$1 AND Available_Date=$2 AND hour=$3"
const addAvailablity="INSERT INTO barber_schedule (UserID, barber_name,Available_Date,hour) VALUES($1, $2, $3, $4)"

module.exports={
    checkAvailablityExists,
    addAvailablity,
}

