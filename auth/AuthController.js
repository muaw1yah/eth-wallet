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
const verifyToken = require('./VerifyToken');

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
            return res.status(500).send('error registering new user');
        }

        // create a new token
        const token = jwt.sign({ _id: user._id }, config.secret, {
            expiresIn: 24 * 60 * 60 // hours * minutes * seconds
        });

        res.status(200).send({ auth: true, token: token });
    });
});

router.post('/login', (req, res) => {
    const params = req.body;
    User.findOne({ email: params.email }, (err, user) => {
        if (err) {
            return res.status(500).send('Server cannot process your request');
        }
        if (!user) {
            return res.status(401).send('Invalid Login Details');
        }

        let passwordIsValid = bcrypt.compareSync(params.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 24 * 60 * 60
        });

        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
})

router.get('/me', verifyToken, (req, res, next) => {
    // get user from the decoded token id
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send("Cannot find user");
        }

        return res.status(200).send(user);
    })
});

module.exports = router;