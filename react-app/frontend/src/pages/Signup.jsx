import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
    <form className="w-96 p-6 bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4 font-semibold">Signup</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full mb-2 rounded-md" required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2 rounded-md" required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4 rounded-md" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">Signup</button>
    </form>
  </div>
  
  );
};

export default Signup;
