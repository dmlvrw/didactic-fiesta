import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "golfcourse",
  password: "password",
  port: 5432,
});

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
