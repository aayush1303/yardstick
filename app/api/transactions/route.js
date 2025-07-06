import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

// GET all transactions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const transactions = await db
      .collection('transactions')
      .find({})
      .sort({ date: -1 })
      .toArray();

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      _id: t._id.toString(),
      date: t.date.toISOString(),
    }));

    return NextResponse.json(formattedTransactions);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST new transaction
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const { description, amount, date, category } = body;

    if (!description || !amount || !date || !category) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newTransaction = {
      description,
      amount,
      date: new Date(date),
      category: category || null,
    };

    await db.collection('transactions').insertOne(newTransaction);

    return NextResponse.json({ message: 'Transaction added successfully' });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}

// DELETE transaction
export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}

// PUT: update a transaction
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const { id, description, amount, date, category } = body;

    if (!id || !description || !amount || !date || !category) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          description,
          amount,
          date: new Date(date),
          category: category || null,
        },
      }
    );

    return NextResponse.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

