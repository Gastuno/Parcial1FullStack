import { useState } from 'react'
import './App.css'
import MovieTable from './MovieGrid.jsx'
import SearchForm from './SearchForm.jsx'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch(event) {
    event.preventDefault()
    const query = search.trim()

    if (query === '') {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/movies/search?q=${(query)}`)

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const data = await response.json()
      setResults(data.results || [])
    }catch {
      setResults([])
      setError('ERROR encontrando peliculas.')
    }finally {
      setLoading(false)
    }
  }

  return (
    <main className="main">
      <h1>CineClub</h1>
      <SearchForm
      search={search}
        loading={loading}
        onSearch={handleSearch}
        onSearchChange={setSearch}
      />
      {!loading && results.length > 0 && (
        <MovieTable movies={results} />
      )}
      {!loading && results.length === 0 && (
        <p>Busca de entre cientos de peliculas!</p>
      )}
    </main>
  )
}

export default App
