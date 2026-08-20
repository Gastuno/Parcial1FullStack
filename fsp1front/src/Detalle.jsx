import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReviewsBox from './ReviewList.jsx'
import './Detalle.css'

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
    return <main className="details">Cargando...</main>
  }

  return (
    <main className="details">
      <Link className="goBack" to="/">Volver</Link>
      <section className="movieDetail">
        {movie.poster_path ? (
          <img
            className="movieDetailPoster"
            src={`${posterUrl}${movie.poster_path}`}
            alt={`Portada de ${movie.title}`}
          />
        ) : (
          <div className="movieDetailPoster2">Sin portada</div>
        )}
        <div className="movieDetailInfo">
          <h1>{movie.title}</h1>
          <p><span className="movieDetailInfo2">Año:</span> {movie.release_date?.slice(0, 4) || 'N/A'}</p>
          <p><span className="movieDetailInfo2">Rating:</span> {movie.vote_average?.toFixed(1) || 'N/A'}</p>
        </div>
      </section>
      <ReviewsBox movieId={id} />
    </main>
  )
}

export default Detalle