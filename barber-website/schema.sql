CREATE TYPE userRole AS ENUM ('Barber', 'Customer', 'Admin');
CREATE TABLE users(
	UserID SERIAL,
	UserRole userRole NOT NULL,
	Email varchar(225) NOT NULL,
	FirstName varchar(45) NOT NULL,
	LastName varchar(45) NOT NULL,
	Telephone varchar(45) NOT NULL,
	Password varchar(64) NOT NULL,
	PRIMARY KEY (UserID),
	UNIQUE (Telephone)
)
/*INSERT INTO USERS (UserRole, Email, firstname,LastName, Telephone, Password) VALUES('Admin','abdulqadir199853@gmail.com','Abdul Qadir','Ali','5148137498','Admin123@');*/

CREATE TABLE faq(
	faqid SERIAL,
	question varchar(65534) NOT NULL,
	answer varchar(65534) NOT NULL,
	PRIMARY KEY (faqid)
)
 
/*INSERT INTO FAQ (question, answer) VALUES('This is a sample of question','This is a sample of answer');*/
