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
  const { rows } = await pool.query("SELECT * FROM courses");
  return NextResponse.json(rows);
}
