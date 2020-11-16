const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token --> ', token);
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided"})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken --> ', decodeToken);
            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    console.log('user --> ', user);
                    if (!user) throw err;
                    console.log('req --> ', req);
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;


// const jwt = require('jsonwebtoken');
// const {User} = require('../models');

// const validateSession = (req, res, next) => {
//     if (req.method === 'OPTIONS') {
//         return next();
//     } else if (req.headers.authorization) {
//         const {authorization} = req.headers;

//         const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
//         console.log(payload);

//         if(payload){
//             User.findOne({
//                 where: {id: payload.id} // finds a user whose id matches the id that was assigned upon login
//             })
//             .then(user => {
//                 //console.log("REQUEST BEFORE", req.user)
//                 req.user = user;
//                 // this creates a user object inside of my request object
//                 // this object stores the data we grabbed from the user table in the database
//                 // console.log("REQUEST AFTER", req.user)
//                 next() //next jumps out of the callback function, we use this to stop triggering the callback function a second time
//             })

//         } else {
//             res.status(401).json({
//                 message: "Not authorized."
//             })
//         }
//         } else {
//             res.status(401).json({
//                 message: "Not allowed."
//             })
//         }
//     }

// module.exports = validateSession 
