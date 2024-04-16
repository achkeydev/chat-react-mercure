const MessagesModel = require('../models/MessagesModel');

exports.getAllMessages = (req, res,next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    MessagesModel.find({
        $or: [
            { $and: [{ sender: userId }, { receiver: friendId }] },
            { $and: [{ sender: friendId }, { receiver: userId }] }
        ]
    })
    .populate('sender receiver', '_id')
        .then(Messages => {
            res.status(200).json({messages: Messages})
        })
        .catch(error => res.status(400).json(error));  
}

exports.sendMessage = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    const newMessage = new MessagesModel({
        message: req.body.message,
        sender: userId,
        receiver: friendId
    })
    return newMessage.save()
        .then(newMessage => {
            return newMessage.populate('sender receiver', '_id')
        })
            .then(newMessage => {
                return res.status(200).json({ message: newMessage });
            })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}
 
exports.deleteDiscussion = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    MessagesModel.deleteMany({
        $or: [
            { $and: [{ sender: userId }, { receiver: friendId }] },
            { $and: [{ sender: friendId }, { receiver: userId }] }
        ]
    })
    .then((removedMessage) => {
        if (removedMessage) {
            res.status(200).json({ message: 'Discussion supprimée avec succès !', removedMessage });
        } else {
            res.status(404).json({ message: 'Messages non trouvés !' });
        }
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
}