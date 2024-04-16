const express = require('express');
const auth = require('../middleware/auth');
const UserControllers = require('../controllers/userControllers');
const rooter = express.Router();


rooter.post('/signup', UserControllers.signup);
rooter.post('/login', UserControllers.login);
rooter.get('/search', auth, UserControllers.searchUser);
rooter.get('/user-info', auth, UserControllers.getUserInfo);

module.exports = rooter;   