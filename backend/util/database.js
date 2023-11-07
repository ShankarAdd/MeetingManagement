const Sequelize = require('sequelize');

const sequelize = new Sequelize('new_schema','root','Shankar@007',{dialect :'mysql',host : 'localhost'});

module.exports = sequelize;