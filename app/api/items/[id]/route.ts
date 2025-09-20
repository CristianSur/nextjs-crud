import { NextRequest, NextResponse } from 'next/server';
import {prisma} from "../../lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const item = await prisma.item.findUnique({ where: { id: Number(params.id) } });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const item = await prisma.item.update({
        where: { id: Number(params.id) },
        data: body,
    });
    return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.item.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({}, { status: 204 });
}
