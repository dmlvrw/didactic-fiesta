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
  try {
    const { rows } = await pool.query(`
      SELECT bookings.id, bookings.user_name, bookings.booking_time, courses.name AS course_name
      FROM bookings
      JOIN courses ON bookings.course_id = courses.id
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "获取预定列表失败" }, { status: 500 });
  }
}

export async function POST(request) {
  const { course_id, user_name } = await request.json();
  try {
    await pool.query(
      "INSERT INTO bookings (course_id, user_name) VALUES ($1, $2)",
      [course_id, user_name]
    );
    return NextResponse.json({ message: "预定成功" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "预定失败" }, { status: 500 });
  }
}
