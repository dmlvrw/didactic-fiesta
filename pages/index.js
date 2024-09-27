import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      <h1>员工信息管理</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
