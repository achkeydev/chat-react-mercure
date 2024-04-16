const { error } = require('console');
const UsersModel = require('../models/UsersModel');

exports.addFriend = (req, res, next) => {
    const userId = req.auth.userId;
    const friendId = req.params.friendId;

    return UsersModel.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
    )
    .populate('friends', 'nom prenom')
    .then(updatedUser => {
        return UsersModel.findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: userId } },
            { new: true }
        )
        .then(() => {
            res.status(200).json(updatedUser);
        })
    })
    .catch(error => {
        console.error('Error:', error);
        // On vérifie le type d'erreur et on renvoie une réponse adaptée
        if (error.name === 'CastError') {
            res.status(400).json({ error: 'Identifiant invalide' });
        } else if (error.name === 'ValidationError') {
            res.status(422).json({ error: 'Données non conformes' });
        } else {
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'ami' });
        }
    });
};

exports.removeFriend = (req, res, next) => {
    const friendIdToRemove = req.params.friendId;
    const userId = req.auth.userId; 

    return UsersModel.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendIdToRemove } }, 
        { new: true } 
    )
    .populate('friends', 'nom prenom')
    .exec()
    .then(user => {
        return UsersModel.findByIdAndUpdate(
            friendIdToRemove,
            { $pull: { friends: userId } }, 
            { new: true } 
        )
        .then(() =>{
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé.' });
            }
            res.json({ message: 'Ami supprimé avec succès.', updateUser: user});
        })
    })
    .catch((error) => {
        console.error('Erreur lors de la suppression de l\'ami :', error);
        // On vérifie le type d'erreur et on renvoie une réponse adaptée
        if (error.name === 'CastError') {
            res.status(400).json({ error: 'Identifiant invalide' });
        } else if (error.name === 'ValidationError') {
            res.status(422).json({ error: 'Données non conformes' });
        } else {
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'ami' });
        }
    });
};
