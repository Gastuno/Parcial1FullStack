function SearchForm({ search, loading, onSearch, onSearchChange }) {
  return (
    <form className="form" onSubmit={onSearch}>
      <div className="search">
        <input
          id="search"
          type="search"
          placeholder="..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </div>
    </form>
  )
}

export default SearchForm
