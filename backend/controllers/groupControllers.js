const { error, group } = require('console');
const UsersModel = require('../models/UsersModel');
const { nextTick } = require('process');
const GroupsModel = require('../models/GroupsModel');

exports.createGroup = (req, res, next) => {
    const userId = req.auth.userId;
    const name = req.params.groupName;
    
    const group = new GroupsModel({
      groupName: name,
      admins: [userId],
      members: []
    })
    return group.save()
      .then(group => {
        return group.populate('admins members')
        .then(group => {
          res.status(201).json({message: 'Le goupe a été créé avec succès !', newGroup: group})
        })
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
};

exports.deleteGroup = (req, res, next) => {
  const userId = req.auth.userId;
  const groupId = req.params.groupId;

  GroupsModel.deleteOne({_id: groupId})
  .then(() => {
    return GroupsModel.find({ 
      $or:[
        {admins: userId},
        {members: userId}
      ]
     })
    .populate('admins members')
      .then((groups) => {
        res.status(200).json({
          message: 'Groupe supprimé avec succès !',
          groups: groups
        });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  })
  .catch(error => {
    res.status(500).json({ error: error.message });
  });
}

exports.joinGroup = (req, res, next) => {
  const userId = req.auth.userId;
  const groupId = req.params.groupId;

  GroupsModel.findByIdAndUpdate(
    groupId,
    {$push: {'members': userId}},
    {new: true}
  )
  .populate('admins members')
  .then(updateGroup => {
    return GroupsModel.find({
      $or:[
        {admins: userId},
        {members: userId}
      ]
    })
    .populate('admins members')
    .then(groups => {
      res.status(200).json({updateGroup: updateGroup, groups: groups});
    })  
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: error.message });
  });
}

exports.withdrawGroup = (req, res, next) => {
  const userId = req.auth.userId;
  const groupId = req.params.groupId;

  return GroupsModel.findByIdAndUpdate(
    groupId,
    {$pull: {members: userId}},
    {new: true}
  )
  .populate('admins members')
  .then(updateGroup => {
    return GroupsModel.find({
      $or:[
        {admins: userId},
        {members: userId}
      ]
    })
    .populate('admins members')
    .then(groups => {
      res.status(200).json({updateGroup: updateGroup, groups: groups});
    })
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: error.message });
  });
}

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });