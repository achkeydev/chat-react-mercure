const mongoose = require('mongoose');

const GroupShema = mongoose.Schema({
    groupName: { type: String, required: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel' }]
}); 

module.exports = mongoose.model('GroupsModel', GroupShema);
