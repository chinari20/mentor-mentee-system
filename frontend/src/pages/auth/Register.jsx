import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentee",
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
      const response = await api.post("/auth/register", formData);
      const data = response.data;

      if (data.role === "mentor") {
        setMessage("Registered successfully. Wait for admin approval.");
        navigate("/login");
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "mentee") {
        navigate("/mentee-dashboard");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>Create account</h2>
          <p>Join as a mentor or mentee and start building connections.</p>

          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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

            <div className="form-group">
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <button type="submit" className="primary-btn" style={{ width: "100%" }}>
              Register
            </button>
          </form>

          <div style={{ marginTop: "18px" }}>
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;