"use client";
import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleAddCourse = async () => {
    if (!courseName) return;
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: courseName }),
    });
    if (res.ok) {
      alert("添加场地成功！");
      setCourseName("");
      // 更新场地列表
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => setCourses(data));
    } else {
      alert("添加场地失败！");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const res = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("删除场地成功！");
      setCourses(courses.filter((course) => course.id !== courseId));
    } else {
      alert("删除场地失败！");
    }
  };

  return (
    <div className="container">
      <h1>管理高尔夫场地</h1>
      <div className="add-course">
        <input
          type="text"
          placeholder="输入场地名称"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button onClick={handleAddCourse}>添加场地</button>
      </div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span>{course.name}</span>
            <button onClick={() => handleDeleteCourse(course.id)}>删除</button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 20px;
        }
        .add-course {
          margin-bottom: 20px;
        }
        input {
          padding: 8px;
          margin-right: 10px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        }
        button {
          background-color: #1890ff;
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
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
      `}</style>
    </div>
  );
}
