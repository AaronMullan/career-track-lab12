const mongoose = require('mongoose');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/phone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const schema = new mongoose.Schema({
  playerName: String,
  team: String,
  position: String,
  games: Number,
  goals: Number,
  assists: Number,
  points: Number,
  plusMinus: Number,
  penaltiesInMinutes: Number,
  shotsOnGoal:  Number,
  gameWinningGoals: Number,
  hits: Number,
  blockedShots: Number
});

const Player = mongoose.model('Player', schema);

function getPlayers(){
  const players = csv()
    .fromFile('./nhl-stats-2019.csv')
    .then(players)
    .map(player => ({
      playerName: player['Player Name'],
      team: player['team'],
    }));
  return Player.create(players);
}
getPlayers();
console.log('done');
