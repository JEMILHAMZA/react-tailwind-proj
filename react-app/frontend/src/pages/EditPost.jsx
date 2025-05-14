import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData({ title: data.title, content: data.content });
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-96 p-6 bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-semibold">Edit Post</h2>
        <input type="text" name="title" value={formData.title} onChange={handleChange}  className="border p-2 w-full mb-2 rounded-md" required />
        <textarea name="content" value={formData.content} onChange={handleChange} className="border p-2 w-full mb-4 rounded-md" required></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded-md">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
