import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/auth/login", formData);
      const data = response.data;

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "mentor") {
        navigate("/mentor-dashboard");
      } else if (data.role === "mentee") {
        navigate("/mentee-dashboard");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p>Login to continue your mentorship journey.</p>

          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: "100%" }}>
              Login
            </button>
          </form>

          <div style={{ marginTop: "18px" }}>
            <Link to="/register">Don’t have an account? Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;