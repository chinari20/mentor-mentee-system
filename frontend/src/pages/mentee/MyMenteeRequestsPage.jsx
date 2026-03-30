import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MyMenteeRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [bookingForm, setBookingForm] = useState({});

  const fetchRequests = async () => {
    try {
      const response = await api.get("/requests/my-mentee-requests");
      setRequests(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load requests"
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (requestId, field, value) => {
    setBookingForm((prev) => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        [field]: value,
      },
    }));
  };

  const handleBookSession = async (requestId) => {
    const data = bookingForm[requestId] || {};

    try {
      const response = await api.post("/sessions", {
        requestId,
        date: data.date || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        mode: data.mode || "online",
        meetingLink: data.meetingLink || "",
        note: data.note || "",
      });

      setMessage(response.data.message);
      fetchRequests();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to book session"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>My Sent Requests</h1>

        {message && <p>{message}</p>}

        {requests.length === 0 ? (
          <p>No requests sent yet</p>
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
              <p><strong>Mentor Name:</strong> {request.mentorId?.name}</p>
              <p><strong>Mentor Email:</strong> {request.mentorId?.email}</p>
              <p><strong>Message:</strong> {request.message || "No message"}</p>
              <p><strong>Status:</strong> {request.status}</p>

              {request.status === "accepted" && (
                <div style={{ marginTop: "15px" }}>
                  <h3>Book Session</h3>

                  <input
                    type="date"
                    value={bookingForm[request._id]?.date || ""}
                    onChange={(e) =>
                      handleChange(request._id, "date", e.target.value)
                    }
                  />
                  <br />
                  <br />

                  <input
                    type="time"
                    value={bookingForm[request._id]?.startTime || ""}
                    onChange={(e) =>
                      handleChange(request._id, "startTime", e.target.value)
                    }
                  />
                  <br />
                  <br />

                  <input
                    type="time"
                    value={bookingForm[request._id]?.endTime || ""}
                    onChange={(e) =>
                      handleChange(request._id, "endTime", e.target.value)
                    }
                  />
                  <br />
                  <br />

                  <select
                    value={bookingForm[request._id]?.mode || "online"}
                    onChange={(e) =>
                      handleChange(request._id, "mode", e.target.value)
                    }
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  <br />
                  <br />

                  <input
                    type="text"
                    placeholder="Meeting Link"
                    value={bookingForm[request._id]?.meetingLink || ""}
                    onChange={(e) =>
                      handleChange(request._id, "meetingLink", e.target.value)
                    }
                  />
                  <br />
                  <br />

                  <textarea
                    placeholder="Note"
                    rows="3"
                    cols="40"
                    value={bookingForm[request._id]?.note || ""}
                    onChange={(e) =>
                      handleChange(request._id, "note", e.target.value)
                    }
                  />
                  <br />
                  <br />

                  <button onClick={() => handleBookSession(request._id)}>
                    Book Session
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

export default MyMenteeRequestsPage;