const express = require('express');

const Interview = require('../models/interview');

const router = express.Router();

router.get('/:id', (req, res) => {
  Interview.findByPk(req.params.id)
    .then(interview => {
      res.send(interview);
    });
})
;

module.exports = router
;
