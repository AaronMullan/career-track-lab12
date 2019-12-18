const { Router } = require('express');
const Player = require('../models/Player');

module.exports = Router()
  .post('/', (req, res, next) => {
    Player
      .create(req.body)
      .then(player => res.send(player))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Player
      .findById(req.params.id)
      .then(player => res.send(player))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Player
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(players => res.send(players))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Player
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(player => res.send(player))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Player
      .findByIdAndDelete(req.params.id)
      .then(player => res.send(player))
      .catch(next);
  });
