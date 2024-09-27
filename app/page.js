"use client";
export default function Home() {
  return (
    <div className="container">
      <h1>高尔夫场地预定系统</h1>
      <nav>
        <ul>
          <li>
            <a href="/courses">管理高尔夫场地</a>
          </li>
          <li>
            <a href="/bookings">管理场地预定</a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
        }
        nav ul {
          list-style: none;
          padding: 0;
        }
        nav li {
          display: inline-block;
          margin: 0 15px;
        }
        nav a {
          text-decoration: none;
          color: #1890ff;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
