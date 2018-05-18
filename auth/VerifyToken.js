const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
    // get token from request header
    const token = req.headers['x-access-token'];

    // if token is not in the request header
    if (!token) {
        // send un authorized error message
        return res.status(403).send('token not provided');
    }

    // check if the token send by user is valid
    jwt.verify(token, config.secret, (err, decode) => {
        // if token cannot be validated
        if (err) {
            // send error message
            return res.status(500).send({ auth: false, message: 'authentication failed with the provided token' });
        }

        req.userId = decode.id;
        next();
    });
}

module.exports = verifyToken;