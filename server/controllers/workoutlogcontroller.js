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

// ********** GET ALL LOGS FOR INDIVIDUAL USER ********** //
    router.get("/", validateSession, (req, res) => {
        let owner_id = req.user.id
        Workout.findAll({
            where: { owner_id: req.user.id }
        })
          .then((workouts) => res.status(200).json(workouts))
          .catch((err) => res.status(500).json({ error: err }));
      });

// ********** GET INDIVIDUAL LOG BY ID FOR INDIVIDUAL USER ********** //
router.get("/:id", validateSession, (req, res) => {
    
    Workout.findOne({
        where: { id: req.params.id, owner_id: req.user.id }
    })
      .then((workouts) => res.status(200).json(workouts))
      .catch((err) => res.status(500).json({ error: err }));
  });

// ********** ALLOW INDIVIDUAL LOGS TO BE UPDATED BY A USER ********** //
router.put("/:id", validateSession, function (req, res) {
    
    const updateWorkoutLog = {
        description: req.body.description,
        definition: req.body.definition,
        results: req.body.results,
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Workout.update(updateWorkoutLog, query)
    .then((workouts) => res.status(200).json(workouts))
    .catch((err) => res.status(500).json({ error: err }));
});

// ********** ALLOW INDIVIDUAL LOGS TO BE DELETED BY A USER ********** //
router.delete('/:id', validateSession, (req, res) => {
    Workout.destroy({
        where: { id: req.params.id, owner_id: req.user.id }
    })
    .then(workout => res.status(200).json(pie))
    .catch(err => res.json({error: err}))
})

module.exports = router; 