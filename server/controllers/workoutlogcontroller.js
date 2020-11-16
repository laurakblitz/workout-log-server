const express = require('express');
const router = express.Router();
const {Workout} = require('../models')
const validateSession = require('../middleware/validateSession');

// router.get("/", (req, res) => {
//     Workout.findAll()
//     .then(workout => res.status(200).json(workout))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
// })

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

module.exports = router; 