import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function AdminDashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [dashboardData, setDashboardData] = useState({
    counts: {
      totalUsers: 0,
      totalMentors: 0,
      totalMentees: 0,
      pendingMentors: 0,
      approvedMentors: 0,
    },
    mentors: [],
    mentees: [],
    pendingMentors: [],
  });

  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load admin dashboard"
      );
    }
  };

  const handleApproveMentor = async (id) => {
    try {
      const response = await api.put(`/admin/mentor/${id}/approve`);
      setMessage(response.data.message);
      fetchDashboardData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to approve mentor"
      );
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const counts = dashboardData.counts || {};

  return (
    <div className="page-container">
      <Navbar />

      <div className="main-content">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="section-subtitle">Welcome back, {userInfo?.name}</p>

        {message && <div className="message">{message}</div>}

        <div className="grid-3">
          <div className="info-card">
            <h3>Total Users</h3>
            <p>{counts.totalUsers}</p>
          </div>
          <div className="info-card">
            <h3>Total Mentors</h3>
            <p>{counts.totalMentors}</p>
          </div>
          <div className="info-card">
            <h3>Total Mentees</h3>
            <p>{counts.totalMentees}</p>
          </div>
          <div className="info-card">
            <h3>Pending Mentors</h3>
            <p>{counts.pendingMentors}</p>
          </div>
          <div className="info-card">
            <h3>Approved Mentors</h3>
            <p>{counts.approvedMentors}</p>
          </div>
        </div>

        <div className="tab-row">
          <button
            className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Mentors
          </button>
          <button
            className={`tab-btn ${activeTab === "mentors" ? "active" : ""}`}
            onClick={() => setActiveTab("mentors")}
          >
            All Mentors
          </button>
          <button
            className={`tab-btn ${activeTab === "mentees" ? "active" : ""}`}
            onClick={() => setActiveTab("mentees")}
          >
            All Mentees
          </button>
        </div>

        {activeTab === "pending" &&
          (dashboardData.pendingMentors.length === 0 ? (
            <div className="card">
              <p>No pending mentors</p>
            </div>
          ) : (
            dashboardData.pendingMentors.map((mentor) => (
              <div key={mentor._id} className="list-card">
                <p><strong>Name:</strong> {mentor.name}</p>
                <p><strong>Email:</strong> {mentor.email}</p>
                <div className="action-row">
                  <button
                    className="success-btn"
                    onClick={() => handleApproveMentor(mentor._id)}
                  >
                    Approve Mentor
                  </button>
                </div>
              </div>
            ))
          ))}

        {activeTab === "mentors" &&
          dashboardData.mentors.map((mentor) => (
            <div key={mentor._id} className="list-card">
              <p><strong>Name:</strong> {mentor.name}</p>
              <p><strong>Email:</strong> {mentor.email}</p>
              <p><strong>Status:</strong> {mentor.isApproved ? "Approved" : "Pending"}</p>
            </div>
          ))}

        {activeTab === "mentees" &&
          dashboardData.mentees.map((mentee) => (
            <div key={mentee._id} className="list-card">
              <p><strong>Name:</strong> {mentee.name}</p>
              <p><strong>Email:</strong> {mentee.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;