const express = require('express');

const path=require('path')

var cors = require('cors');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const calendarRoutes = require('./routes/calendar')

app.use('/calendar', calendarRoutes);

sequelize
.sync()
.then(res =>{
    app.listen(4000);
})
.catch(err => console.log(err));
