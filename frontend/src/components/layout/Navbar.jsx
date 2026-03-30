import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          Mentor Mentee
        </Link>

        <div className="nav-links">
          {!userInfo ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-user">
                {userInfo.name} ({userInfo.role})
              </span>

              {userInfo.role === "mentor" && (
                <>
                  <Link to="/mentor-dashboard">Dashboard</Link>
                  <Link to="/mentor-profile">My Profile</Link>
                  <Link to="/mentor-requests">Requests</Link>
                  <Link to="/mentor-sessions">Sessions</Link>
                </>
              )}

              {userInfo.role === "mentee" && (
                <>
                  <Link to="/mentee-dashboard">Dashboard</Link>
                  <Link to="/mentee-profile">My Profile</Link>
                  <Link to="/mentors">Browse Mentors</Link>
                  <Link to="/my-requests">My Requests</Link>
                  <Link to="/my-sessions">Sessions</Link>
                </>
              )}

              {userInfo.role === "admin" && (
                <Link to="/admin-dashboard">Dashboard</Link>
              )}

              <button className="secondary-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;