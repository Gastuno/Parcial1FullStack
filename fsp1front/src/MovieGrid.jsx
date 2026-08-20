const posterUrl = 'https://image.tmdb.org/t/p/w92'

function MovieGrid({ movies }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Portada</th>
          <th>Titulo</th>
          <th>Año</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>
              {movie.poster_path ? (
                <img
                  className="movie-poster"
                  src={`${posterUrl}${movie.poster_path}`}
                  alt={`Portada de ${movie.title}`}
                />) : ('N/A')}
            </td>
            <td>{movie.title}</td>
            <td>{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</td>
            <td>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MovieGrid
