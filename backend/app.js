const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const messagesRoutes = require('./routes/messagesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const { error } = require('console');
require('dotenv').config();
const app = express();
const dbConnectionString = process.env.MONGODB_URI;

app.use(cors());

mongoose.connect(dbConnectionString ,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/api/message', messagesRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/friend', friendsRoutes);
app.use('/api/group', groupsRoutes);
app.use('/api/notification', notificationsRoutes);

module.exports = app;