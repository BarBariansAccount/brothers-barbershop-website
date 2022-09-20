local database setup for development:
we are using postgres sql

1: download postgres sql and set the password to 'November199853@' --> its the password I have used now and I will change it after
2: click on database and create new database --> barber

backend setup:

cd into backend folder and run the following commands:

1-npm init
2-npm install express
3-npm install express body-parser cors morgan 
4-npm install --save sequelize pg pg-hstore
5-npm i -D nodemon
6- then do -->  npm start 
If everything is connected and your posgressql databse is set up correctly I have used a test function and in the console it will print out database connected otherwise tell you the error
