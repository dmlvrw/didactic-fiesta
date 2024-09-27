import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "golfcourse",
  password: "password",
  port: 5432,
});

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
    return NextResponse.json({ message: "取消预定成功" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "取消预定失败" }, { status: 500 });
  }
}
