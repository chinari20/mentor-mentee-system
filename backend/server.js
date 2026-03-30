const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/mentees", require("./routes/menteeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});