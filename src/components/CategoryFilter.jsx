
export default function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="category-filter-container">
      <h1 className="category-title">Latest articles</h1>
      <select
        value={selectedCategory}
        onChange={e => onChange(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
