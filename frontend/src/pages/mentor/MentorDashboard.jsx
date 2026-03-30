import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function MentorDashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await api.get("/mentors/my-profile");
      setProfile(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load mentor profile"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      <div className="main-content">
        <h1 className="section-title">Mentor Dashboard</h1>
        <p className="section-subtitle">Welcome back, {userInfo?.name}</p>

        {message && <div className="message">{message}</div>}

        <div className="grid-3">
          <div className="info-card">
            <h3>Role</h3>
            <p>{userInfo?.role}</p>
          </div>
          <div className="info-card">
            <h3>Approval</h3>
            <p>{userInfo?.isApproved ? "Approved" : "Pending"}</p>
          </div>
          <div className="info-card">
            <h3>Profile Status</h3>
            <p>{profile?.headline ? "Updated" : "Incomplete"}</p>
          </div>
        </div>

        <div className="action-row" style={{ marginTop: "24px" }}>
          <Link to="/mentor-profile" className="primary-btn">
            Edit Profile
          </Link>
          <Link to="/mentor-requests" className="secondary-btn">
            View Requests
          </Link>
          <Link to="/mentor-sessions" className="secondary-btn">
            View Sessions
          </Link>
        </div>

        <div className="card" style={{ marginTop: "24px" }}>
          <h2 style={{ marginBottom: "16px" }}>My Profile Summary</h2>

          {!profile ? (
            <p>Loading profile...</p>
          ) : (
            <div className="grid-2">
              <div>
                <p><strong>Headline:</strong> {profile.headline || "Not added"}</p>
                <p><strong>Bio:</strong> {profile.bio || "Not added"}</p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {profile.skills?.length ? profile.skills.join(", ") : "Not added"}
                </p>
                <p><strong>Experience:</strong> {profile.experience || "Not added"}</p>
              </div>

              <div>
                <p><strong>Education:</strong> {profile.education || "Not added"}</p>
                <p><strong>Availability:</strong> {profile.availability || "Not added"}</p>
                <p><strong>Hourly Rate:</strong> ₹{profile.hourlyRate || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;