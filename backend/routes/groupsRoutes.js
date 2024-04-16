const express = require('express');
const auth = require('../middleware/auth');
const GroupControllers = require('../controllers/groupControllers');
const rooter = express.Router();

rooter.post('/create-group/:groupName', auth, GroupControllers.createGroup);
rooter.delete('/delete-group/:groupId', auth, GroupControllers.deleteGroup);
rooter.post('/join-group/:groupId', auth, GroupControllers.joinGroup); 
rooter.delete('/withdraw-group/:groupId', auth, GroupControllers.withdrawGroup);

module.exports = rooter;

