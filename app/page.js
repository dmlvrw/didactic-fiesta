"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleBooking = async () => {
    if (!selectedCourse || !userName) return;
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course_id: selectedCourse, user_name: userName }),
    });
    if (res.ok) {
      alert("预定成功！");
    } else {
      alert("预定失败！");
    }
  };

  return (
    <div>
      <h1>高尔夫场地列表</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => setSelectedCourse(course.id)}>预定</button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h2>预定场地</h2>
          <p>您选择了: {courses.find((c) => c.id === selectedCourse)?.name}</p>
          <input
            type="text"
            placeholder="输入您的姓名"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleBooking}>确认预定</button>
        </div>
      )}
    </div>
  );
}
