import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import header from "../Assets/images/header.jpg";

const API_BASE = "http://localhost:3000";

export default function PostList() {
  const [categories, setCategories] = useState([]);
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [category, page]);

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      let url = "";
      if (category) {
        url = `${API_BASE}/posts/category/${encodeURIComponent(category)}/page/${page}`;
      } else {
        url = `${API_BASE}/posts/page/${page}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPostsData({
        posts: data.posts,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError(err.message);
      setPostsData({ posts: [], totalPages: 1 });
    }
    setLoading(false);
  }

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    setPage(1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div className="">
       <div className="header-container">
      <img src={header} alt="Truecaller Logo" className="header-image" />
      <h1 className="header-text"> The Truecaller Blog</h1>
    </div>
     <div className="container">
         <CategoryFilter categories={categories} selectedCategory={category} onChange={handleCategoryChange} />

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="posts-list">
        {postsData.posts.length === 0 && !loading && <p>No posts found.</p>}
        {postsData.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination page={page} totalPages={postsData.totalPages} onPageChange={handlePageChange} />
    </div>
     </div>
  );
}
