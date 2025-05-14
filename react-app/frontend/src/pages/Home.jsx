import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded-md">Create New Post</Link>
      </div>
      {posts.length === 0 ? (
        <p className="mt-4 text-gray-500">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="bg-white p-4 shadow-md rounded-md border">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-3 flex space-x-2">
                <Link to={`/edit/${post._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</Link>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

