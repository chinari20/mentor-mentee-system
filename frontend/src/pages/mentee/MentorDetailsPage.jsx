import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

function MentorDetailsPage() {
  const { id } = useParams();

  const [mentor, setMentor] = useState(null);
  const [message, setMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const fetchMentor = async () => {
    try {
      const response = await api.get(`/mentors/${id}`);
      setMentor(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load mentor details"
      );
    }
  };

  const handleSendRequest = async () => {
    try {
      const response = await api.post("/requests", {
        mentorId: id,
        message: requestMessage,
      });
      setMessage(response.data.message);
      setRequestMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to send request"
      );
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [id]);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Mentor Details</h1>

        {message && <p>{message}</p>}

        {!mentor ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              marginTop: "20px",
            }}
          >
            <p><strong>Name:</strong> {mentor.name}</p>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p>
              <strong>Headline:</strong>{" "}
              {mentor.profile?.headline || "Not added"}
            </p>
            <p><strong>Bio:</strong> {mentor.profile?.bio || "Not added"}</p>
            <p>
              <strong>Skills:</strong>{" "}
              {mentor.profile?.skills?.length > 0
                ? mentor.profile.skills.join(", ")
                : "Not added"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {mentor.profile?.experience || "Not added"}
            </p>
            <p>
              <strong>Education:</strong>{" "}
              {mentor.profile?.education || "Not added"}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {mentor.profile?.availability || "Not added"}
            </p>
            <p>
              <strong>Hourly Rate:</strong> ₹
              {mentor.profile?.hourlyRate || 0}
            </p>

            <hr style={{ margin: "20px 0" }} />

            <h3>Send Mentorship Request</h3>

            <textarea
              rows="4"
              cols="50"
              placeholder="Write a message to mentor"
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleSendRequest}>Send Request</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorDetailsPage;