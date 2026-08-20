function Detalle() {
  return <main>Movie details
    <tr>
        <th>Titulo</th>
        <th>Año</th>
        <th>Rating</th>
    </tr>
    <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.release_date?.slice(0, 4)}</td>
        <td>{movie.vote_average?.toFixed(1)}</td>
    </tr>

  </main>
}

export default Detalle