const {DataTypes} = require('sequelize');
const db = require('../db');

const Workout = db.define('workout', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    results: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Workout 