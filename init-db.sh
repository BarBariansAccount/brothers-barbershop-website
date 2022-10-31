#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE TYPE userRole AS ENUM ('Barber', 'Customer','admin');
CREATE TABLE users(
     UserID SERIAL,
     UserRole userRole NOT NULL,
     Email varchar(225) NOT NULL,
     FirstName varchar(45) NOT NULL,
     LastName varchar(45) NOT NULL,
     Telephone varchar(45) NOT NULL,
     Password varchar(64) NOT NULL,
     PRIMARY KEY (UserID),
     UNIQUE (Email,Telephone)
);
INSERT INTO USERS (UserRole, Email, firstname,LastName, Telephone, Password) VALUES('admin','abdulqadir199853@gmail.com','Abdul Qadir','Ali','1111111111','$2b$12$5eTD7nTPFAH4Y3LC3wThvuLz7fHTMygKnxIsLEIafBx0ACxtVer6C');
EOSQL
