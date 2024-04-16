const express = require('express');
const notificationControllers = require('../controllers/notificationControllers');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-notification/:friendId', auth, notificationControllers.createNotification);
router.get('/get-all-notifications', auth, notificationControllers.getAllNotifications);
router.delete('/delete-all-notifications', auth, notificationControllers.deleteAllNotifications);
router.post('/in-discussion/:friendId', auth, notificationControllers.inDiscussion);
router.delete('/outside-discussion/:friendId', auth, notificationControllers.outsideDiscussion);

module.exports = router;