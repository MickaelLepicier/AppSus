export function MailFilterSearch({ filterBy , handleSearch}) {
  return (
    <section className="search-bar-container">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        className="search-input"
        placeholder="Search Mail"
        // value={filterBy || ''}
        onChange={handleSearch}
      />
    </section>
  )
}
