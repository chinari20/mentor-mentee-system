import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MyMentorRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await api.get("/requests/my-mentor-requests");
      setRequests(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load requests"
      );
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await api.put(`/requests/${id}/status`, { status });
      setMessage(response.data.message);
      fetchRequests();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update request"
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Mentor Requests</h1>

        {message && <p>{message}</p>}

        {requests.length === 0 ? (
          <p>No mentorship requests found</p>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Mentee Name:</strong> {request.menteeId?.name}</p>
              <p><strong>Mentee Email:</strong> {request.menteeId?.email}</p>
              <p><strong>Message:</strong> {request.message || "No message"}</p>
              <p><strong>Status:</strong> {request.status}</p>

              {request.status === "pending" && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => handleUpdateStatus(request._id, "accepted")}>
                    Accept
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(request._id, "rejected")}
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyMentorRequestsPage;