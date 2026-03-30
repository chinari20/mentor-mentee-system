import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function MentorListingPage() {
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMentors = async () => {
    try {
      const response = await api.get("/mentors");
      setMentors(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load mentors"
      );
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Browse Mentors</h1>

        {message && <p>{message}</p>}

        {mentors.length === 0 ? (
          <p>No approved mentors available</p>
        ) : (
          mentors.map((mentor) => (
            <div
              key={mentor._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Name:</strong> {mentor.name}</p>
              <p>
                <strong>Headline:</strong>{" "}
                {mentor.profile?.headline || "Not added"}
              </p>
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

              <Link to={`/mentor-details/${mentor._id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MentorListingPage;