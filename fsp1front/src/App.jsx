import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(event) {
    event.preventDefault()
    const query = search.trim()

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/movies/search?q=${(query)}`,
      )

      const data = await response.json()
      setResults(data.results || [])
    } catch {
      setResults([])
      return response.status(404).json({ error: 'ERROR encontrando peliculas.' });
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="main">
      <h1>Movies</h1>
      <form className="form" onSubmit={handleSearch}>
        <div className="search">
          <input
            id="search"
            type="search"
            placeholder="..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
      {!loading && !error && (
        results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Año</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {results.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.release_date?.slice(0, 4)}</td>
                  <td>{movie.vote_average?.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron peliculas con ese nombre.</p>
        )
      )}
    </main>
  )
}

export default App
