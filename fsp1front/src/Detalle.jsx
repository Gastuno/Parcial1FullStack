import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReviewsBox from './ReviewList.jsx'

function Detalle() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const posterUrl = 'https://image.tmdb.org/t/p/w92'

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
  }, [id])

  if (!movie) {
    return <main>Cargando...</main>
  }

  return (
    <main className="main">
      <Link to="/">Volver</Link>
      <td>
        {movie.poster_path ? (
          <img
            className="moviePoster"
            src={`${posterUrl}${movie.poster_path}`}
          />) : ('N/A')}
      </td>
      <h1>{movie.title}</h1>
      <p>Year: {movie.release_date?.slice(0, 4) || 'N/A'}</p>
      <p>Rating: {movie.vote_average?.toFixed(1) || 'N/A'}</p>
      <ReviewsBox movieId={id} />
    </main>
  )
}

export default Detalle