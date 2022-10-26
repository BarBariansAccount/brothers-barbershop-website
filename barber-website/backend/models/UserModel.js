const getUsers  = "SELECT users.userid, users.userrole, users.email, users.firstname, users.lastname, users.telephone FROM users";

const addUser= "INSERT INTO users (UserRole, Email, FirstName, LastName, Telephone, Password) VALUES ($1, $2, $3, $4, $5, $6)";

const checkUserExists= "SELECT users.userid, users.userrole, users.email, users.firstname, users.lastname FROM users WHERE users.userid=$1";

const checkUserExists_telephone= "SELECT users.userid, users.userrole, users.email, users.firstname, users.lastname FROM users WHERE users.telephone=$1";

const getPassword = "SELECT u.password FROM users u WHERE u.Telephone=$1";

const updateUser = "UPDATE users SET email = $1, firstname = $2, lastname = $3 WHERE userid = $4";

const deleteUser= "DELETE FROM users u WHERE u.userid=$1";

const getpassword_telephone= "SELECT users.password FROM users WHERE users.telephone=$1";

const getpassword= "SELECT users.password FROM users WHERE users.userid=$1";

const updatePassword= "UPDATE users SET password = $2 WHERE userid = $1"


module.exports = {
    getUsers,
    addUser,
    checkUserExists,
    getPassword,
    updateUser,
    deleteUser,
    checkUserExists_telephone,
    getpassword_telephone,
    getpassword,
    updatePassword
}
