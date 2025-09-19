import { NextRequest, NextResponse } from 'next/server';

interface Item {
    id: number;
    name: string;
}

// Simple in-memory store
const items: Item[] = [];
let currentId = 1;

export async function GET(request: NextRequest) {
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
        return NextResponse.json({ error: 'Name is required and must be a string' }, { status: 400 });
    }

    const newItem = { id: currentId++, name };
    items.push(newItem);

    return NextResponse.json(newItem, { status: 201 });
}
