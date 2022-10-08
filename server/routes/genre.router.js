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

// GET all genres for a specified movie id using JOINS.
router.get('/:movieId', (req, res) => {
  // set movieId to req.params.movieId
  const movieId = req.params.movieId;
  // setup SQL query statement.
  const queryText = `SELECT "mg"."id",
  "mg"."genre_id",
  "g"."name" AS "genre",
  "mg"."movie_id"
  FROM "genres" AS "g"
  JOIN "movies_genres" AS "mg" ON "g"."id"="mg"."genre_id"
  JOIN "movies" AS "m" ON "mg"."movie_id"="m"."id"
  WHERE "m"."id"=$1;`;

  pool.query(queryText, [movieId])
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log('Error in GET for genres of movie', err);
    res.sendStatus(500);
  });
});

module.exports = router;