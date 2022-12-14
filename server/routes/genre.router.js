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

// POST to add a new genre to a movie.
router.post('/add', (req, res) => {
  const queryText = `INSERT INTO "movies_genres" ("movie_id", "genre_id")
  VALUES ($1, $2);`
  console.log('POST to add genre to movie', req.body.movie_id, req.body.genre_id);
  pool.query(queryText, [req.body.movie_id, req.body.genre_id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Erroring adding a genre to the movie', err);
  });
});

// delete genre for a movie.
router.delete('/remove', (req, res) => {
  // const movieId = req.params.movieId;
  const queryText = `DELETE FROM "movies_genres" 
  WHERE "movie_id"=$1 AND "genre_id"=$2;`;
  console.log('in DELETE for /remove', req.body);
  pool.query(queryText, [req.body.movie_id, req.body.genre_id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Error in deleting genre from movie', err);
    res.sendStatus(500);
  })
});

// GET all genres for a specified movie id using SQL JOINS.
router.get('/:movieId', (req, res) => {
  // set movieId to req.params.movieId
  const movieId = req.params.movieId;
  console.log(req.params);
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
    // console.log(`Genre(s) for movie with id:${movieId}`,response.rows);
    res.send(response.rows);
  })
  .catch(err => {
    console.log('Error in GET for genres of movie', err);
    res.sendStatus(500);
  });
});

module.exports = router;