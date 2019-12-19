const mongoose = require('mongoose');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/players', {
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
});
const Player = mongoose.model('Player', schema);

const csvFilePath = './nhl-stats-2019.csv';
// let players = [];
csv({
  delimiter: ','
})
  .fromFile(csvFilePath)
  .then((csvToJsonFiles) => {
    const players = csvToJsonFiles
      .map(player => ({
        playerName: player.Player,
        team: player.Team,
        position: player.Pos,
        games: player.Games,
        goals: player.G
      
      }));
    console.log(players);
    return Player.create(players);
  })
  .then(() => console.log('done'));
