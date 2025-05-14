import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      showMessage("Login successful!", "success");
      navigate("/");
    } else {
      showMessage(data.message, "error");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-96 p-6 bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-semibold">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2 rounded-md" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4 rounded-md" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;

