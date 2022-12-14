const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});


// GET request to retrieve a movie with given id.
router.get('/:movieId', (req, res) => {
  console.log('GET movie with id:', req.params);
  // set variable to the request params.
  const movieId = req.params.movieId;
  // SQL query text with data sanitization.
  const queryText = `SELECT * FROM "movies" WHERE "id"=$1;`;
  pool.query(queryText, [movieId])
  .then(response => {
    // console.log('Received movie', response.rows[0]);
    res.send(response.rows[0]);
  })
  .catch(err => {
    console.log(`Error in GET for movie with id:${movieId}`);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

// PUT route to update movie details.
router.put('/:movieId', (req, res) => {
  console.log('In PUT /movie', req.body, req.params);
  const movieId = req.params.movieId;
  // setup SQL querytext with data sanitization.
  const queryText = `UPDATE "movies" SET 
  "title"=$1, "poster"=$2, "description"=$3
  WHERE "id"=$4;`;
  pool.query(queryText, [req.body.title, req.body.poster, req.body.description, movieId])
  .then(response => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('Error updating movie', err);
    res.sendStatus(500);
  })
});

// get route to search for a movie with a given title.
router.get('/search/:title', (req, res) => {
  const title = req.params.title;
  const queryText = `SELECT * FROM "movies" WHERE "title"=$1;`;

  pool.query(queryText, [title])
  .then(response => {
    res.send(response.rows);
  })
  .catch(err => {
    console.log('Error getting movie with title', err);
    res.sendStatus(500);
  });
});

module.exports = router;