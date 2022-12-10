const addResetPassword = "INSERT INTO resetpassword (telephone,resetcode,expiretime) VALUES ($1, $2, $3)";

const updateResetCode= "UPDATE resetpassword SET resetcode=$2, expiretime=$3 WHERE telephone = $1";

const getResetCode = "SELECT resetcode,expiretime FROM resetpassword WHERE telephone=$1";

const deleteResetCode = "DELETE FROM resetpassword WHERE telephone=$1";


module.exports={
    addResetPassword,
    updateResetCode,
    getResetCode,
    deleteResetCode
}