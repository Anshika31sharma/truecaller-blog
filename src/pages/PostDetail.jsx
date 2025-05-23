import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

const API_BASE = "http://localhost:3000";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`);
        if (res.status === 404) {
          setError("Post not found");
          setPost(null);
          return;
        }
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
        setPost(null);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return null;

  return (
     <div>
       <img src={post.featured_image} alt={post.title} className="post-featured-image" />
    <div className="container">
      <header className="post-header">
        <h1>{post.title}</h1>
       <div className="post-meta">
  <img src={post.author_image} alt={post.author} className="author-image" />
  <div className="author-info">
    <span className="author-name">{post.author}</span>
    <span className="post-date"> · {timeAgo(post.first_publication_date)}</span>
  </div>
</div>

      </header>

      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
     </div>
  );
}
