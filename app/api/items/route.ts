import {prisma} from "../lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const item = await prisma.item.create({ data: body });
    return NextResponse.json(item, { status: 201 });
}