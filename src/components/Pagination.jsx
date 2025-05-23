
export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-wrapper">
      <button
        className="pagination-arrow"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        &#8592; 
      </button>

      {pages.map((pg) => (
        <button
          key={pg}
          className={`pagination-button ${page === pg ? "active" : ""}`}
          onClick={() => onPageChange(pg)}
        >
          {pg}
        </button>
      ))}

      <button
        className="pagination-arrow"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        &#8594;
      </button>
    </div>
  );
}
