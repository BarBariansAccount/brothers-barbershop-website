const { Sequelize } = require('sequelize');

module.exports =  new Sequelize('barber', 'postgres', 'November199853@', {
    host: 'localhost',
    dialect: 'postgres'
  });