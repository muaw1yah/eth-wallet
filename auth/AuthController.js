/*
 * AuthController.js
 * 
 * Import required packages
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// import configurations and user Model
const config = require('../config');
const User = require('../user/User');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// regiser new user
router.post('/register', (req, res) => {
    const params = req.body;
    const hashedPassword = bcrypt.hashSync(params.password, 10);
    const payload = {
        name: params.name,
        email: params.email,
        password: hashedPassword
    }

    User.create(payload, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send('error registering new user');
        }

        // create a new token
        const token = jwt.sign({ _id: user._id }, config.secret, {
            expiresIn: 24 * 60 * 60 // hours * minutes * seconds
        });

        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/me', (req, res) => {
    // get token from request header
    const token = req.headers['x-access-token'];

    // if token is not in the request header
    if(!token) {
        // send un authorized error message
        return res.status(401).send('Un Authorized');
    }

    // check if the token send by user if valid
    jwt.verify(token, config.secret, (err, decode) => {
        // if token cannot be validated
        if(err) {
            // send error message
            return res.status(500).send({ auth: false, message: 'authentication failed with the provided token'});
        }

        // get user from the decoded token id
        User.findById(decode._id, (err, user) => {
            if(err) {
                return res.status(500).send("Cannot find user");
            }

            return res.status(200).send(user);
        })
    });
});

module.exports = router;