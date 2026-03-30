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
      setMessage("Failed to load sessions");
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
          <p>No sessions</p>
        ) : (
          sessions.map((s) => (
            <div key={s._id}>
              <p>{s.date}</p>
              <p>{s.startTime} - {s.endTime}</p>
              <p>{s.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyMenteeSessionsPage;