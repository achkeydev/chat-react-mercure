const mongoose = require('mongoose');

const messageShema = mongoose.Schema({
    message: {type: String, reuired: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel', reuired: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel', required: true}
});

module.exports = mongoose.model('MessagesModel',messageShema);