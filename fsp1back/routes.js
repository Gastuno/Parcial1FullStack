const express = require('express')
const router = express.Router()

router.get('/api/movies/search?:query', async (request, response) => {
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
  const tmdbId = request.query.tmdbId
    try {
        const movie = await axios.get(
            'https://api.themoviedb.org/3/movie/{movie_id}',
            {
                params: {
                    movie_id: tmdbId
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                }
            }
        )

        response.status(200).json(movie.data)
    } catch (error) {
        response.status(404).json({ error: 'Error' })
    }
})

//REVIEWS//

router.post('/api/movies/:tmdbId/reviews', (request, response) => {
  const newReview = request.body;

  if (!newReview.score) {
    return response.status(400).json({ error: 'Error: Elija una puntuación' });
  }
  else {
    newReview.reviewId = (Date.now)

    reviews.push(newReview);
    response.status(201).json(newReview);
  }
})

router.delete('/api/reviews/:reviewId', (request, response) => {
  const id = request.params.reviewId
  reviews = reviews.filter(review => review.reviewId !== id)

  response.status(200).end()
})

module.exports = router