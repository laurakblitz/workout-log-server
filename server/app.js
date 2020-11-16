require('dotenv').config();

const express = require('express');

const db = require("./db");

const app = express();

app.use(require('./middleware/headers'));

db.sync()

const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use("/log", controllers.workoutlogcontroller);

app.use(require('./middleware/validateSession'));


// db.authenticate()
// .then(() => db.sync()) // => {force: true}
// .then(() => {
//     app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
// })
// .catch((err) => {
//     console.log("[Server: ] Server Crashed");
//     console.error(err);
// })



app.listen(3005, function(){
    console.log('App is listening on port 3005')
});