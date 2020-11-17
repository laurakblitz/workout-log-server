require('dotenv').config();

const express = require('express');

const db = require("./db");

const app = express();

app.use(require('./middleware/headers'));

db.sync()

const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use(require('./middleware/validateSession'));
app.use("/log", controllers.workoutlogcontroller);


app.listen(3005, function(){
    console.log('App is listening on port 3005')
});