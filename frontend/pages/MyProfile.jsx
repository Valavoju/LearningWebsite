import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const markComplete = async (moduleIndex) => {
    try {
      const course = selectedCourse;
      course.modules[moduleIndex].completed = true;

      // Optional: Update DB with PATCH request
      await axios.patch(
        `http://localhost:5000/api/courses/${course._id}/completeModule`,
        { moduleIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedCourse({ ...course });
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return <h2>Please login to see your profile</h2>;

  return (
    <div className="profile-container">
      {user && <h1>Welcome, {user.username}!</h1>}

      <h2>Your Enrolled Courses</h2>
      <div className="courses-grid">
        {user?.enrolledCourses.length ? (
          user.enrolledCourses.map(course => (
            <div 
              key={course._id} 
              className="course-card" 
              onClick={() => { setSelectedCourse(course); setSelectedModule(null); }}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))
        ) : (
          <p>You have not enrolled in any courses yet.</p>
        )}
      </div>

      {/* Selected Course Modules */}
      {selectedCourse && (
        <div className="modules-container">
          <h2>{selectedCourse.title} Modules</h2>
          <button onClick={() => setSelectedCourse(null)}>Back to Courses</button>
          <ul>
            {selectedCourse.modules?.length ? (
              selectedCourse.modules.map((module, idx) => (
                <li 
                  key={idx} 
                  className={`module-item ${module.completed ? "completed" : ""}`}
                  onClick={() => setSelectedModule(module)}
                >
                  {module.title}
                  {module.completed && " ✅"}
                </li>
              ))
            ) : (
              <li>No modules available</li>
            )}
          </ul>
        </div>
      )}

      {/* Selected Module Content */}
      {selectedModule && (
        <div className="module-content">
          <h3>{selectedModule.title}</h3>
          {selectedModule.type === "video" ? (
            <iframe
              width="560"
              height="315"
              src={selectedModule.content}
              title={selectedModule.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p>{selectedModule.content}</p>
          )}
          <button onClick={() => markComplete(selectedCourse.modules.indexOf(selectedModule))}>
            Mark as Completed
          </button>
          <button onClick={() => setSelectedModule(null)}>Close Module</button>
        </div>
      )}
    </div>
  );
}
