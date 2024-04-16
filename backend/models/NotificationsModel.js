const mongoose = require('mongoose');

const NotificationShema = mongoose.Schema({
    message: {type: String, required: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel', required: true}
})

module.exports = mongoose.model('NotificationsModel', NotificationShema);