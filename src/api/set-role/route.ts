"use server";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { role } = await req.json();

  const cookieStore = cookies();
  (await cookieStore).set('role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60, // 1 día
  });

  return NextResponse.json({ ok: true });
}
         