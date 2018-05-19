const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./user/UserController');
app.use('/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

const WalletController = require('./wallet/WalletController');
app.use('/wallet', WalletController);


module.exports = app;