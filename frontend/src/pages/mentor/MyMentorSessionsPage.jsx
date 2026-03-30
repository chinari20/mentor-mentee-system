import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MyMentorSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await api.get("/sessions/my-mentor-sessions");
      setSessions(response.data);
    } catch (error) {
      setMessage("Failed to load sessions");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await api.put(`/sessions/${id}/status`, { status });
      setMessage(response.data.message);
      fetchSessions();
    } catch (error) {
      setMessage("Failed to update session");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Mentor Sessions</h1>

        {message && <p>{message}</p>}

        {sessions.length === 0 ? (
          <p>No sessions found</p>
        ) : (
          sessions.map((session) => (
            <div key={session._id}>
              <p><strong>Mentee:</strong> {session.menteeId?.name}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.startTime} - {session.endTime}</p>
              <p><strong>Status:</strong> {session.status}</p>

              {session.status === "scheduled" && (
                <div>
                  <button onClick={() => handleStatusUpdate(session._id, "completed")}>
                    Complete
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(session._id, "cancelled")}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
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

export default MyMentorSessionsPage;