'use strict'
const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
  res.status(200).send({
    By: "Rafael S. Monte"

  });
});
module.exports = router;