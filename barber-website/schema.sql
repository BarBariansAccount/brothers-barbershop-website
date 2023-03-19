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
ALTER TABLE users
ADD picturelink varchar(255);
/*INSERT INTO USERS (UserRole, Email, firstname,LastName, Telephone, Password) VALUES('Admin','abdulqadir199853@gmail.com','Abdul Qadir','Ali','5148137498','Admin123@');*/
CREATE TABLE faq(
	faqid SERIAL,
	question varchar(65534) NOT NULL,
	answer varchar(65534) NOT NULL,
	PRIMARY KEY (faqid)
)
/*INSERT INTO FAQ (question, answer) VALUES('This is a sample of question','This is a sample of answer');*/
/*Password reset request table*/
CREATE TABLE ResetPassword(
	Telephone varchar(45) NOT NULL,
	ResetCode varchar(45) NOT NULL,
	Expiretime timestamp NOT NULL,
	PRIMARY KEY (Telephone)
)
/*schedule table*/
CREATE TYPE hour AS ENUM (
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20'
);
CREATE TYPE service AS ENUM (
	'Haircut',
	'Haircut + Beard',
	'Line up',
	'Beard only',
	'Line up + Beard'
);
CREATE TABLE barber_schedule(
	appointment_id SERIAL,
	UserID integer REFERENCES users (userid),
	barber_name varchar(225) NOT NULL,
	Available_Date Date NOT NULL,
	hour hour NOT NULL,
	Booked Boolean DEFAULT FALSE,
	Customer_First_name varchar(225),
	Customer_Last_name varchar(225),
	Customer_email varchar(225),
	Customer_telephone varchar(225),
	service service,
	Customer_appointment_notes varchar(225),
	PRIMARY KEY (appointment_id),
	CONSTRAINT fk_users FOREIGN KEY(userid) REFERENCES users(userid)
);
/*
 Date format is yyyy-mm-dd
 default value for booked is False
 */
/*INSERT INTO barber_schedule (UserID, barber_name,Available_Date,hour) VALUES(37,'test','2022-11-22','11');*/
CREATE TABLE products(
	productsid SERIAL,
	title varchar(255) NOT NULL,
	description varchar(65534) NOT NULL,
	picturelink varchar(255),
	PRIMARY KEY (productsid)
)
/*****************************
 About on home page
 */
CREATE TABLE About(title varchar(7000) NOT NULL);
/*After creating the table also insert the following statement*/
INSERT INTO About (title)
VALUES('hello');
/*****************************
 Pricing on home page
 */
Create table Pricing(
	service service,
	price varchar(255),
	duration varchar(255)
);
INSERT INTO Pricing (service, price, duration)
VALUES('Haircut', '$35', '45 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Haircut + Beard', '$40', '1 Hour');
INSERT INTO Pricing (service, price, duration)
VALUES('Line up', '$15', '30 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Beard only', '$15', '30 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Line up + Beard', '$20', '30 Minutes');
/******************Working Hours on home page
 */
CREATE TYPE Days AS ENUM (
	'SUNDAY',
	'MONDAY',
	'TUESDAY',
	'WEDNESDAY',
	'THURSDAY',
	'FRIDAY',
	'SATURDAY'
);
CREATE TABLE workingHours (day days, description varchar(255));
INSERT INTO workingHours (day, description)
VALUES('SUNDAY', 'CLOSED');
INSERT INTO workingHours (day, description)
VALUES('MONDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('TUESDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('WEDNESDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('THURSDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('FRIDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('SATURDAY', 'CLOSED');