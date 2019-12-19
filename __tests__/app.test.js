require('dotenv').config();


const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Player = require('../lib/models/Player');

describe('players routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

 
  let player;
  beforeEach(async() => {
    player = await Player.create({
      playerName: 'Alex Ovechkin',
      team: 'Washington Capitals',
      position: 'Right Wing',
      games: 80,
      goals: 100
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new player', () => {
    return request(app)
      .post('/api/v1/players')
      .send({
        playerName: 'Alex Ovechkin',
        team: 'Washington Capitals',
        position: 'Wight Ring',
        games: 80,
        goals: 100
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          playerName: 'Alex Ovechkin',
          team: 'Washington Capitals',
          position: 'Wight Ring',
          games: 80,
          goals: 100,
          __v: 0
        });
      });
  });

  it('gets a player by id', () => {
    return request(app)
      .get(`/api/v1/players/${player.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: player.id,
          playerName: 'Alex Ovechkin',
          team: 'Washington Capitals',
          position: 'Right Wing',
          games: 80,
          goals: 100,
          __v: 0
        });
      });
  });

  it('get all players', () => {
    return request(app)
      .get('/api/v1/players')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: player.id,
            playerName: 'Alex Ovechkin',
            team: 'Washington Capitals',
            position: 'Right Wing',
            games: 80,
            goals: 100,
            __v: 0
          }
        ]);
      });
  });

  it('updates a player', () => {
    return request(app)
      .patch(`/api/v1/players/${player.id}`)
      .send({ playerName: 'Tom Wilson' })
      .then(res => {
        expect(res.body).toEqual({
          _id: player.id,
          playerName: 'Tom Wilson',
          team: 'Washington Capitals',
          position: 'Right Wing',
          games: 80,
          goals: 100,
          __v: 0
        });
      });
  });

  it('deletes a player', () => {
    return request(app)
      .delete(`/api/v1/players/${player.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: player.id,
          playerName: 'Alex Ovechkin',
          team: 'Washington Capitals',
          position: 'Right Wing',
          games: 80,
          goals: 100,
          __v: 0
        });
      });
  });
});
