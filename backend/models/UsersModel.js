const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserShema = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'}],
    inDiscussion: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
});

UserShema.plugin(uniqueValidator);

module.exports = mongoose.model('UsersModel', UserShema);  