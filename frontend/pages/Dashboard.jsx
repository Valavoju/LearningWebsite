import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    };

    fetchCourses();
    fetchUser();
  }, [token]);

  const handleEnroll = async (courseId) => {
    if (!token) {
      alert("Please login to enroll!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/enroll",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Error enrolling");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Available Courses</h1>
      {user && <h2>Welcome, {user.username}!</h2>}
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={() => handleEnroll(course._id)}>Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
