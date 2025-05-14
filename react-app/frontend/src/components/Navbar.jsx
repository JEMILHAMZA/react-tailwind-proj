import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">My Blog</Link>
      <div>
        {token ? (
          <>
            <button onClick={handleLogout} className="px-3 text-red-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3">Login</Link>
            <Link to="/signup" className="px-3">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

