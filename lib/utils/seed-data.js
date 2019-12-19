const csv = require('csvtojson');

const csvFilePath = './nhl-stats-2019.csv';
// let players = [];
function seedData(){
  return csv({
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
}

module.exports = { seedData };
