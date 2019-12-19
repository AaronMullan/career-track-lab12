const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  playerName: String,
  team: String,
  position: String,
  games: Number,
  goals: Number,
});

//write aggregates here

module.exports = mongoose.model('Player', schema);
