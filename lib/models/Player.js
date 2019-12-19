const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  playerName: String,
  team: String,
  position: String,
  games: Number,
  goals: Number,
});

schema.statics.getGoalsByPosition = function(){
  return this.aggregate([
    {
      '$group': {
        '_id': '$position', 
        'totalGoals': {
          '$sum': '$goals'
        }
      }
    }, {
      '$sort': {
        'totalGoals': -1
      }
    }
  ]);
};
schema.statics.getGoalsPerGame = function(){
  return this.aggregate([
    {
      '$addFields': {
        'goalsPerGame': {
          '$divide': [
            '$goals', '$games'
          ]
        }
      }
    }, {}
  ]);
};
module.exports = mongoose.model('Player', schema);
