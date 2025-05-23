
  import { useNavigate } from "react-router-dom";
  import { timeAgo } from "../utils/timeAgo";

  const categoryColors = {
    "Scam Alert": "#e63946",
    "Impact": "#457b9d",
    "Life at Truecaller": "#2a9d8f",
    "News": "#1d3557",
    "Features": "#f4a261",
    "Diversity and Inclusion": "#9b5de5",
  };

  export default function PostCard({ post }) {
    const navigate = useNavigate();
    const color = categoryColors[post.category] || "#ccc";
    const truncatedTitle = post.title.length > 24 ? post.title.slice(0, 24) + "..." : post.title;

    return (
      <div
        className="post-card"
        onClick={() => navigate(`/post/${post.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="post-category-wrapper">
          <span className="category-dot" style={{ backgroundColor: color }}></span>
          <small className="post-category">{post.category}</small>
        </div>
        <img
          src={post.featured_image}
          alt={post.title}
          className="post-thumbnail"
        />
        <div className="post-info">
          <h3 className="post-title">{truncatedTitle}</h3>
          <small className="post-date">{timeAgo(post.first_publication_date)}</small>
        </div>
      </div>
    );
  }
