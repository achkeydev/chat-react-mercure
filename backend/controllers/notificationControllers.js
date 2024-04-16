const NotificationsModel = require('../models/NotificationsModel');
const UsersModel = require('../models/UsersModel');

exports.createNotification = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    UsersModel.findById(friendId)
    .then(friend => {
        if(friend.inDiscussion && friend.inDiscussion.equals(userId)){
            return res.status(200).json({message: 'Aucune notification crée'})
        }else{
            return UsersModel.findById(userId)
            .then(user => { 
                const newNotification = new NotificationsModel({
                message: `Vous avez reçu un nouveau message de ${user.prenom} ${user.nom}`,
                receiver: friendId
                })
                return newNotification.save()
                .then(() => {
                    return res.status(200).json({message: 'Notification crée avec succès'})
                })
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

exports.getAllNotifications = (req, res, next) => {
    const userId = req.auth.userId;

    NotificationsModel.find({receiver: userId})
        .then(notifications => {
            const reversedNotifications = notifications.reverse();
            res.status(200).json({reversedNotifications})
        })
        .catch(error => res.status(400).json(error));
}

exports.deleteAllNotifications = (req, res, next) => {
    const userId = req.auth.userId;

    NotificationsModel.deleteMany({receiver: userId})
    .then(() => {
        res.status(200).json({message:'Notifications supprimées avec succès!'})
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

exports.inDiscussion = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    UsersModel.findByIdAndUpdate(
        userId,
        {$push: {inDiscussion: friendId}}
    )
    .then(() => {
        res.status(200).json({message:'friend.id ajouté à inDiscussion avec succès'})
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

exports.outsideDiscussion = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    UsersModel.findByIdAndUpdate(
        userId,
        {$pull: {inDiscussion: friendId}}
    )
    .then(() => {
        res.status(200).json({message:'friend.id retiré de inDiscussion avec succès'})
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    }); 
}