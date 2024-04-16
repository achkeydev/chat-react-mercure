const { error } = require('console');
const UsersModel = require('../models/UsersModel');
const GroupsModel = require('../models/GroupsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');

exports.signup = [
    check('email').isEmail().withMessage('Adresse e-mail non valide'),
    check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        UsersModel.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    return bcrypt.hash(req.body.password, 10);
                } else {
                    throw { message: 'Compte avec cet email déjà existant !', status: 401 };
                }
            })
            .then(hash => {
                const newUser = new UsersModel({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: hash,
                });
                return newUser.save();
            })
            .then(() => res.status(201).json({ message: 'Votre compte a été créé avec succès !' }))
            .catch(error => {
                console.error('Error:', error);
                return res.status(error.status || 500).json({ error: error.message || 'Erreur inconnue' });
            });
    }
];

exports.login = [
    check('email').isEmail().withMessage('Adresse e-mail non valide'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return UsersModel.findOne({email: req.body.email})
            .then(user => {
                if(user === null){
                    return res.status(401).json({message: 'Paire identifiant/ mot de passe incorrects'});
                }
                return bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid){
                            return res.status(401).json({message: 'Paire identifiant/ mot de passe incorrects'});
                        }
                        return res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                {userId: user._id},
                                'RANDOM_TOKEN_SECRET', 
                                {expiresIn: '24h'}
                            )
                        });
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.name === 'Invalid password format') {
                    res.status(400).json({error: 'Le format du mot de passe est invalide'});
                } else if (error.name === 'MongoError' || error.name === 'TypeError') {
                    res.status(500).json({error: 'Erreur lors de la connexion'});
                } else {
                    res.status(500).json({error: 'Erreur inconnue'});
                }
            });
    }
]

exports.getUserInfo = (req, res, next) => {
    const userId = req.auth.userId;

    return UsersModel.findById(userId)
        .select('-password -email')
        .populate('friends', 'nom prenom')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            return user;
        })
        .then(user => {
            GroupsModel.find({
                $or: [
                    { 'admins': userId },
                    { 'members': userId }
                ]
            })
            .populate({
                path: 'admins',
                select: 'nom prenom'
            })
            .populate({
                path: 'members',
                select: 'nom prenom'
            })
            .then(groups => {
                if (groups.length === 0) {
                    return res.status(200).json({ userInfo: user});
                }

                return res.status(200).json({ userInfo: user, groups: groups });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des informations des groupes' });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.name === 'CastError') {
                res.status(400).json({ error: 'Identifiant invalide' });
            } else if (error.name === 'ValidationError') {
                res.status(422).json({ error: 'Données non conformes' });
            } else {
                res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
            }
        });
};



const searchUsersByField = (field, value, userId) => {
    return UsersModel.find({
        _id: { $ne: userId },
        [field]: { $regex: new RegExp(`^${value}`, 'i') }   
    });
};

const handleSearchResult = (res, users, groups) => {
    if (users.length > 0 || groups.length > 0) {
        res.status(200).json({searchGroups: groups, searchUsers: users});
    } else {
        res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
};

const searchGroupsByTerm = (term) => {
    return GroupsModel.find({
        'groupName': { $regex: new RegExp(`^${term}`, 'i') }
    })
    .populate('admins members')
  };

  exports.searchUser = (req, res, next) => {
    const userId = req.auth.userId;
    const searchTerm = req.query.q;
    const searchTermsArray = searchTerm.split(' ').filter(term => term.trim() !== '');

    if (searchTermsArray.length === 2) {
        const [firstTerm, secondTerm] = searchTermsArray;

        searchUsersByField('nom', firstTerm, userId)
            .then(usersWithFirstTermInNom => {
                if (usersWithFirstTermInNom.length > 0) {
                    return searchUsersByField('prenom', secondTerm, userId);
                } else {
                    searchUsersByField('prenom', firstTerm, userId)
                        .then(usersWithFirstTermInPrenom => {
                            if (usersWithFirstTermInPrenom > 0) {
                                return searchUsersByField('nom', secondTerm, userId);
                            }
                        })
                }
            })
            .then(usersWithSecondTermInPrenom => handleSearchResult(res, usersWithSecondTermInPrenom))
            .catch(error => {
                console.error('Error:', error);
                if (error.name === 'CastError') {
                    res.status(400).json({ error: 'Identifiant invalide' });
                } else if (error.name === 'ValidationError') {
                    res.status(422).json({ error: 'Données non conformes' });
                } else {
                    res.status(500).json({ error: 'Erreur lors de la recherche d\'utilisateurs' });
                }
            });
    } else {
        const searchExpressions = searchTermsArray.map(term => ({
            $or: [
                { nom: { $regex: new RegExp(`^${term}`, 'i') } },
                { prenom: { $regex: new RegExp(`^${term}`, 'i') } }
            ]
        }));
        UsersModel.find({ _id: { $ne: userId }, $and: searchExpressions })
            .then(users => {
                return searchGroupsByTerm(searchTerm)
                .then(groups => handleSearchResult(res, users, groups))
                .catch(error => {
                    console.error('Error:', error);
                    if (error.name === 'CastError') {
                        res.status(400).json({ error: 'Identifiant invalide' });
                    } else if (error.name === 'ValidationError') {
                        res.status(422).json({ error: 'Données non conformes' });
                    } else {
                        res.status(500).json({ error: 'Erreur lors de la recherche de groupes' });
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.name === 'CastError') {
                    res.status(400).json({ error: 'Identifiant invalide' });
                } else if (error.name === 'ValidationError') {
                    res.status(422).json({ error: 'Données non conformes' });
                } else {
                    res.status(500).json({ error: 'Erreur lors de la recherche d\'utilisateurs et de groupes' });
                }
            });
    }
};
