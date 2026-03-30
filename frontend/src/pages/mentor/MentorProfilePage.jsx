import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";

function MentorProfilePage() {
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    availability: "",
    hourlyRate: "",
  });

  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await api.get("/mentors/my-profile");
      const data = response.data;

      setFormData({
        headline: data.headline || "",
        bio: data.bio || "",
        skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
        experience: data.experience || "",
        education: data.education || "",
        availability: data.availability || "",
        hourlyRate: data.hourlyRate || "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load profile"
      );
    }
  };

  useEffect(() => {
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
      await api.put("/mentors/my-profile", formData);
      setMessage("Profile updated successfully");
      fetchProfile();
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
        <h1>Edit Mentor Profile</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Headline</label>
            <br />
            <input
              type="text"
              name="headline"
              placeholder="Ex: MERN Stack Mentor"
              value={formData.headline}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Bio</label>
            <br />
            <textarea
              name="bio"
              placeholder="Write about yourself"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              cols="50"
            />
          </div>

          <br />

          <div>
            <label>Skills</label>
            <br />
            <input
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Experience</label>
            <br />
            <input
              type="text"
              name="experience"
              placeholder="Ex: 2 years in full stack development"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Education</label>
            <br />
            <input
              type="text"
              name="education"
              placeholder="Ex: B.Tech CSE"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Availability</label>
            <br />
            <input
              type="text"
              name="availability"
              placeholder="Ex: Weekends, 6 PM to 9 PM"
              value={formData.availability}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Hourly Rate</label>
            <br />
            <input
              type="number"
              name="hourlyRate"
              placeholder="Ex: 500"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default MentorProfilePage;