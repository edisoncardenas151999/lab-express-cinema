const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model.js");
/* GET home page */
router.get('/', (req, res, next) => res.render('index'));


router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((allTheMoviesFromDB) => {
        // console.log("Retrieved movies from DB:", allTheMoviesFromDB);
        res.render("movies.hbs", { movies: allTheMoviesFromDB }); 
      })
      .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
        next(error);
      });
  });

  router.get("/movie/:movieId", (req, res) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
      .then((theMovie) => res.render("movie.hbs", { movie: theMovie }))
      .catch((error) => {
        console.log("Error while retrieving movie details: ", error);
        next(error);
      });
  });
  

module.exports = router;

