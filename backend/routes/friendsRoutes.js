const express = require('express');
const auth = require('../middleware/auth');
const FriendControllers = require('../controllers/friendControllers');
const rooter = express.Router();

rooter.post('/add-friend/:friendId', auth, FriendControllers.addFriend);
rooter.delete('/remove-friend/:friendId', auth, FriendControllers.removeFriend);

module.exports = rooter;