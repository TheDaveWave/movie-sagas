const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  // SQL query text.
  const queryText = `SELECT * FROM "genres" ORDER BY "name";`;
  pool.query(queryText)
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log('Error in GET /api/genre', err);
    res.sendStatus(500);
  })
});

module.exports = router;