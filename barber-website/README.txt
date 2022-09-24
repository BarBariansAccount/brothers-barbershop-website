local database setup for development:
we are using postgres sql

1: download postgres sql and set the password to 'POSTGRES' --> OR YOU CAN EVEN CHANGE TO THE PASSWORD YOU HAVE SAVED ON YOUR LOCAL SETUP BY GOING INTO database.js file
2: click on psql (command line) and create new database --> barbershop and CREATE TABLE users( email VARCHAR(255) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255));
then for testing create one user -->INSERT INTO users VALUES ('test1@gmail.com','test1','test1');

backend setup:

cd into backend folder and run the following commands:

1-npm init
2-npm install express
3-npm install express
4-npm install --save pg pg-hstore
5-npm i -D nodemon
6- then do -->  npm start 

