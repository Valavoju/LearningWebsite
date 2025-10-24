import React, { useEffect, useState } from "react";

function CoursePage({ userId, courseId }) {
  const [course, setCourse] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  // Fetch course details
  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [courseId]);

  // Fetch user progress
  useEffect(() => {
    fetch(`/api/progress/${userId}/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCompletedModules(data.completedModules || []));
  }, [userId, courseId]);

  // Mark module as completed
  const markCompleted = (moduleIndex) => {
    fetch("/api/progress/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId, moduleIndex }),
    })
      .then((res) => res.json())
      .then((data) => setCompletedModules(data.completedModules));
  };

  if (!course) return <p>Loading...</p>;

  // Calculate progress
  const progressPercent = Math.round(
    (completedModules.length / course.modules.length) * 100
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{progressPercent}% completed</p>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Modules</h2>
      <ul className="space-y-4 mt-2">
        {course.modules.map((mod, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{mod.title}</h3>
              {mod.type === "video" && (
                <iframe
                  width="400"
                  height="250"
                  src={mod.content
                    .replace("youtu.be/", "www.youtube.com/embed/")
                    .split("?")[0]}
                  title={mod.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mt-2 rounded"
                ></iframe>
              )}
            </div>

            {completedModules.includes(index) ? (
              <span className="text-green-600 font-bold">✅ Completed</span>
            ) : (
              <button
                onClick={() => markCompleted(index)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursePage;
