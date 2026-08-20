const express = require('express')
const axios = require('axios')
const data = require('../data')
const router = express.Router()

router.get('/api/movies/search', async (request, response) => {
  const query = request.query.q
    try {
        const movies = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params: {
                    query: query
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                }
            }
        )

        response.status(200).json(movies.data)
    } catch (error) {
        response.status(404).json({ error: 'Error' })
    }
})

router.get('/api/movies/:tmdbId', async (request, response) => {
    const tmdbId = request.params.tmdbId
    try {
        const movie = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                }
            }
        )

        response.status(200).json(movie.data)
    } catch (error) {
        response.status(404).json({ error: 'Error: Pelicula no encontrada' })
    }
})

//REVIEWS//

router.get('/api/movies/:tmdbId/reviews', (request, response) => {
    const movieId = request.params.tmdbId
    const movieReviews = data.reviews.filter((review) => review.movieId === movieId)

    response.status(200).json(movieReviews)
})

router.post('/api/movies/:tmdbId/reviews', (request, response) => {
  const newReview = request.body;

    if (!newReview.author || !newReview.score || !newReview.comment) {
    return response.status(400).json({ error: 'Error: Elija una puntuación' });
  }

    const review = {
        reviewId: String(Date.now()),
        movieId: request.params.tmdbId,
        author: newReview.author,
        score: newReview.score,
        comment: newReview.comment,
    }

    data.reviews.push(review)
    response.status(201).json(review)
})

router.delete('/api/reviews/:reviewId', (request, response) => {
  const id = request.params.reviewId
    data.reviews = data.reviews.filter((review) => review.reviewId !== id)

  response.status(200).end()
})

module.exports = router