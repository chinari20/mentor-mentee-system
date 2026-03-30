import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function Home() {
  return (
    <div className="page-container">
      <Navbar />

      <div className="main-content">
        <section className="hero">
          <div>
            <h1>Connect mentors and mentees in one powerful platform</h1>
            <p>
              Build meaningful guidance, mentorship requests, profile management,
              and session booking — all inside one modern web app.
            </p>

            <div className="action-row">
              <Link to="/register" className="primary-btn">
                Get Started
              </Link>
              <Link to="/login" className="secondary-btn">
                Login
              </Link>
            </div>
          </div>

          <div className="hero-box">
            <h2>Why this platform?</h2>
            <p>
              Mentors can create profiles, mentees can browse and request help,
              and admins can manage approvals smoothly.
            </p>
          </div>
        </section>

        <section className="grid-3">
          <div className="info-card">
            <h3>For Mentors</h3>
            <p>Profile + Requests</p>
          </div>

          <div className="info-card">
            <h3>For Mentees</h3>
            <p>Browse + Book</p>
          </div>

          <div className="info-card">
            <h3>For Admin</h3>
            <p>Approve + Manage</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;