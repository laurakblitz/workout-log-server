const express = require('express');
const router = express.Router();
const {Workout} = require('../models')
const validateSession = require('../middleware/validateSession');

// ********** LOG WORKOUT ********** //
router.post('/', async (req, res) => {
    
    try {

        const {description, definition, results} = req.body;
        const owner_id = req.user.id;

        let newWorkout = await Workout.create({
            description, definition, results, owner_id: owner_id
        });

        // let newWorkout = await Workout.create({
        //     description, definition, results
        // });

        res.status(200).json({
            workout: newWorkout,
            message: "Workout logged!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Workout failed to log."
        })
    }
});

// ********** GET ALL WORKOUTS FOR INDIVIDUAL USER ********** //
router.get("/", (req, res) => {
    Workout.findAll()
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({ error: err }))
});


module.exports = router; 