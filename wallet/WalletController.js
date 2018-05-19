const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Web3 = require('web3');
const jwt = require('jsonwebtoken');

const User = require('../user/User');
const verifyToken = require('../auth/VerifyToken');
const config = require('../config');
const keyStore = require('eth-lightwallet').keystore;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var web3 = new Web3(config.infura_ropsten);

// CREATES A NEW USER
router.post('/', (req, res, next) => {
    var account = web3.eth.accounts.create();

    var wallet = {
        publicAddress: account.address,
        privateKey: account.privateKey,
        created_at: new Date()
    }

    // get token from request header
    const token = req.headers['x-access-token'];

    // if token is not in the request header
    if (!token) {
        // return wallet to the client
        return res.status(200).send(wallet);
    }

    // check if the token send by user is valid
    jwt.verify(token, config.secret, (err, decode) => {
        // if token cannot be validated
        if (err) {
            // send error message
            return res.status(500).send({ auth: false, message: 'authentication failed with the provided token' });
        }
        
        User.findOneAndUpdate(
            {_id: decode.id},
            { $push: { wallets: wallet  } },
            (err, user) => {
            if(err) {
                return res.status(403).send('cannot find user');
            }

            return res.status(200).send(wallet);
        });
    });
});


module.exports = router;