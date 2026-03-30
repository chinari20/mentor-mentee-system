import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MyMenteeSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await api.get("/sessions/my-mentee-sessions");
      setSessions(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load sessions"
      );
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await api.put(`/sessions/${id}/status`, { status });
      setMessage(response.data.message);
      fetchSessions();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update session status"
      );
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>My Sessions</h1>

        {message && <p>{message}</p>}

        {sessions.length === 0 ? (
          <p>No sessions booked yet</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Mentor:</strong> {session.mentorId?.name}</p>
              <p><strong>Email:</strong> {session.mentorId?.email}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.startTime} - {session.endTime}</p>
              <p><strong>Mode:</strong> {session.mode}</p>
              <p><strong>Meeting Link:</strong> {session.meetingLink || "Not added"}</p>
              <p><strong>Note:</strong> {session.note || "No note"}</p>
              <p><strong>Status:</strong> {session.status}</p>

              {session.status === "scheduled" && (
                <button onClick={() => handleStatusUpdate(session._id, "cancelled")}>
                  Cancel Session
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyMenteeSessionsPage;