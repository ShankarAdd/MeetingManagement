const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Calendar = sequelize.define('calendar',{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allownull : false,
        primaryKey : true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    googleMeetLink: Sequelize.STRING,
    selectedSlot: Sequelize.STRING
})
module.exports = Calendar;