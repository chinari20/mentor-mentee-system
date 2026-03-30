import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MenteeProfilePage() {
  const [formData, setFormData] = useState({
    interests: "",
    learningGoals: "",
    education: "",
    about: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/mentees/my-profile");
        const data = response.data;

        setFormData({
          interests: Array.isArray(data.interests)
            ? data.interests.join(", ")
            : "",
          learningGoals: data.learningGoals || "",
          education: data.education || "",
          about: data.about || "",
        });
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to load profile"
        );
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.put("/mentees/my-profile", formData);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Mentee Profile</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="interests"
              placeholder="Interests (comma separated)"
              value={formData.interests}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <textarea
              name="learningGoals"
              placeholder="Learning Goals"
              value={formData.learningGoals}
              onChange={handleChange}
              rows="4"
              cols="50"
            />
          </div>

          <br />

          <div>
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <textarea
              name="about"
              placeholder="About"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              cols="50"
            />
          </div>

          <br />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default MenteeProfilePage;