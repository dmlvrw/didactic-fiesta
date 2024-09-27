import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "golfcourse",
  password: "password",
  port: 5432,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 5;
  const offset = (page - 1) * pageSize;

  try {
    const { rows: courses } = await pool.query(
      "SELECT * FROM courses ORDER BY id LIMIT $1 OFFSET $2",
      [pageSize, offset]
    );
    const { rows } = await pool.query("SELECT COUNT(*) FROM courses");
    const totalCourses = parseInt(rows[0].count);
    const totalPages = Math.ceil(totalCourses / pageSize);
    return NextResponse.json({ courses, totalPages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "获取场地列表失败" }, { status: 500 });
  }
}
