import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
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
        <h2 className="text-2xl mb-4 font-semibold">Create Post</h2>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full mb-2 rounded-md" required />
        <textarea name="content" placeholder="Content" onChange={handleChange} className="border p-2 w-full mb-4 rounded-md" required></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded-md">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
