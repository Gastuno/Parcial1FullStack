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

module.exports = router