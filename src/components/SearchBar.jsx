export default function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
