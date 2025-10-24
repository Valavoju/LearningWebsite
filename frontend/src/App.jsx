import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx"; // renamed
import CoursePage from "./components/CoursePage.jsx"; // newly added

const App = () => {
  const [user, setUser] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username"); // store username on login
    if (token && username) {
      setUser({ username, token });
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        {/* Header with title left, nav right */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          {/* Heading */}
          <h1 style={{ color: "red", margin: 0 }}>Training Center Website</h1>

          {/* Navigation */}
          <nav>
            <Link to="/" style={{ margin: "0 15px", textDecoration: "none", color: "#333" }}>Dashboard</Link>
            {!user && <Link to="/register" style={{ margin: "0 15px", textDecoration: "none", color: "#333" }}>Register</Link>}
            {!user && <Link to="/login" style={{ margin: "0 15px", textDecoration: "none", color: "#333" }}>Login</Link>}
            {user && <Link to="/myprofile" style={{ margin: "0 15px", textDecoration: "none", color: "#333" }}>My Profile</Link>}
            {user && (
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "15px",
                  padding: "6px 12px",
                  background: "#e63946",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/myprofile" element={user ? <MyProfile user={user} /> : <Navigate to="/login" />} />
          <Route path="/course/:courseId" element={user ? <CoursePage user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
