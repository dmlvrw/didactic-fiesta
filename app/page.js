"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
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
      // 更新预定列表
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    } else {
      alert("预定失败！");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("取消预定成功！");
      // 更新预定列表
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } else {
      alert("取消预定失败！");
    }
  };

  return (
    <div className="container">
      <h1>高尔夫场地列表</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span>{course.name}</span>
            <button onClick={() => setSelectedCourse(course.id)}>预定</button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="booking-form">
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

      <h2>现有预定列表</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <span>
              {booking.user_name} 预定了 {booking.course_name}
            </span>
            <button onClick={() => handleCancelBooking(booking.id)}>
              取消预定
            </button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
          margin: 0;
          padding: 20px;
          text-align: center;
        }

        h1,
        h2 {
          color: #333;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background-color: #fff;
          margin: 10px auto;
          padding: 15px;
          max-width: 500px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button {
          background-color: #1890ff;
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #40a9ff;
        }

        input {
          padding: 8px;
          margin-right: 10px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        }

        .booking-form {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
