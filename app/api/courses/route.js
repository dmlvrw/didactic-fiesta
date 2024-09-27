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
    const { rows } = await pool.query("SELECT * FROM courses");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "获取场地列表失败" }, { status: 500 });
  }
}

export async function POST(request) {
  const { name } = await request.json();
  try {
    await pool.query("INSERT INTO courses (name) VALUES ($1)", [name]);
    return NextResponse.json({ message: "添加场地成功" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "添加场地失败" }, { status: 500 });
  }
}
