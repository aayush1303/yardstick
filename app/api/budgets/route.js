import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db();

  const budgets = await db.collection('budgets').find({}).toArray();
  return NextResponse.json(budgets);
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db();
  const body = await req.json();

  const { category, amount, month } = body;

  await db.collection('budgets').updateOne(
    { category, month },
    { $set: { amount } },
    { upsert: true }
  );

  return NextResponse.json({ message: 'Budget saved' });
}
