const getUsers  = "SELECT * FROM users";
const addUser= "INSERT INTO users (UserRole, Email, FirstName, LastName, Telephone, Password) VALUES ($1, $2, $3, $4, $5, $6)";
const checkUserExists= "SELECT * FROM users WHERE users.Telephone=$1";
const getPassword = "SELECT u.password FROM users u WHERE u.Telephone=$1";
const updateUser = "UPDATE users SET Email = $1, FirstName = $2, LastName = $3, Password = $5 WHERE users.Telephone = $4";
const deleteUser= "DELETE FROM users u WHERE u.telephone=$1"


module.exports = {
    getUsers,
    addUser,
    checkUserExists,
    getPassword,
    updateUser,
    deleteUser,
}
