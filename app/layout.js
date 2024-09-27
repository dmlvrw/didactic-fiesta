export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <nav>
          <ul>
            <li>
              <a href="/">首页</a>
            </li>
            <li>
              <a href="/courses">管理高尔夫场地</a>
            </li>
            <li>
              <a href="/bookings">管理场地预定</a>
            </li>
          </ul>
        </nav>
        {children}
        <style jsx>{`
          nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            background-color: #f0f2f5;
          }
          nav li {
            margin-right: 15px;
          }
          nav a {
            text-decoration: none;
            color: #1890ff;
            font-size: 18px;
            padding: 10px;
            display: block;
          }
          nav a:hover {
            background-color: #e6f7ff;
          }
        `}</style>
      </body>
    </html>
  );
}
