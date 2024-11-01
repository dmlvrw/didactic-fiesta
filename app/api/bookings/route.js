import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const res = await pool.query('SELECT * FROM bookings');
  return NextResponse.json(res.rows);
}

export async function POST(request) {
  const data = await request.json();
  const { name, email, date } = data;
  await pool.query(
    'INSERT INTO bookings(name, email, date) VALUES($1, $2, $3)',
    [name, email, date]
  );
  return NextResponse.json({ status: 'success' });
}
