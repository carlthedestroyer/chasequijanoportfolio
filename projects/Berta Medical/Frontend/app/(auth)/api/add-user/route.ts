import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  try {
    if (!username || !password) throw new Error('Missing username or password');
    await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}