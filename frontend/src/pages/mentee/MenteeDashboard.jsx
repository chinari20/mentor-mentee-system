import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

function MenteeDashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="page-container">
      <Navbar />

      <div className="main-content">
        <h1 className="section-title">Mentee Dashboard</h1>
        <p className="section-subtitle">Welcome back, {userInfo?.name}</p>

        <div className="grid-3">
          <div className="info-card">
            <h3>Role</h3>
            <p>{userInfo?.role}</p>
          </div>
          <div className="info-card">
            <h3>Explore</h3>
            <p>Mentors</p>
          </div>
          <div className="info-card">
            <h3>Sessions</h3>
            <p>Manage</p>
          </div>
        </div>

        <div className="action-row" style={{ marginTop: "24px" }}>
          <Link to="/mentee-profile" className="primary-btn">
            My Profile
          </Link>
          <Link to="/mentors" className="secondary-btn">
            Browse Mentors
          </Link>
          <Link to="/my-requests" className="secondary-btn">
            My Requests
          </Link>
          <Link to="/my-sessions" className="secondary-btn">
            My Sessions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboard;