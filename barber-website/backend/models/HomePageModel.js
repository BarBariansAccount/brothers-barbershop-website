const updateAbout="UPDATE About SET title = $1 WHERE 1=1";

const getAbout="Select title from About";

const getPricing= "Select * from pricing"

const updatePricing="UPDATE pricing SET price = $2 , duration=$3 WHERE service=$1";

const getWorkingHours="Select * from workinghours";

const updateWorkingHours ="UPDATE workinghours SET description = $2  WHERE day=$1"


module.exports={
    updateAbout,
    getAbout,
    getPricing,
    updatePricing,
    getWorkingHours,
    updateWorkingHours
}
