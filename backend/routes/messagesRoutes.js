const express = require('express');
const messagesControllers = require('../controllers/messageControllers');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/send-message/:friendId',auth, messagesControllers.sendMessage);
router.delete('/delete-discussion/:friendId',auth, messagesControllers.deleteDiscussion);
router.get('/get-all-messages/:friendId',auth, messagesControllers.getAllMessages);

module.exports = router;