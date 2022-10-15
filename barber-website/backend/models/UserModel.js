const getUsers  = "SELECT * FROM users";
const addUser= "INSERT INTO users (UserRole, Email, FirstName, LastName, Telephone, Password) VALUES ($1, $2, $3, $4, $5, $6)";
const checkUserExists= "SELECT * FROM users WHERE users.Telephone=$1";
const getPassword = "SELECT u.password FROM users u WHERE u.Telephone=$1";
const updateUser = "UPDATE users SET email = $1, firstname = $2, lastname = $3, password = $5 WHERE telephone = $4";
const deleteUser= "DELETE FROM users u WHERE u.telephone=$1"


module.exports = {
    getUsers,
    addUser,
    checkUserExists,
    getPassword,
    updateUser,
    deleteUser,
}
