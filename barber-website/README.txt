local database setup for development:
we are using postgres sql

1: download postgres sql and set the password to 'POSTGRES' --> OR YOU CAN EVEN CHANGE TO THE PASSWORD YOU HAVE SAVED ON YOUR LOCAL SETUP BY GOING INTO database.js file
2: click on psql (command line) and create new database --> barbershop
3: To connect to database --> \c barbershop
4: To list the existing relations in database through psql --> \d

Backend setup:

cd into backend folder and run the following commands:

1-npm install express cors morgan bcrypt jsonwebtoken dotenv multer
2-npm install --save pg pg-hstore
3-npm i -D nodemon
4- then do -->  npm start 

