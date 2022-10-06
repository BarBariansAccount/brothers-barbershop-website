const getUsers  = "SELECT * FROM users";
const addUser= "INSERT INTO users (UserRole, Email, FirstName, LastName, Telephone, Password) VALUES ($1, $2, $3, $4, $5, $6)";
const checkUserExists= "SELECT * FROM users WHERE users.Telephone=$1";
const checkPassword = "SELECT * FROM users WHERE users.Telephone=$1 AND users.password=$2";
const updateUser = "UPDATE users SET Email = $1, FirstName = $2, LastName = $3, Telephone = $4, Password = $5 WHERE users.Email = $1";


module.exports = {
    getUsers,
    addUser,
    checkUserExists,
    checkPassword,
    updateUser,
}
