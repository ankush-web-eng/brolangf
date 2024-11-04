import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { bugDescription } = reqBody;

        const isCreated = prisma.bug.create({
            data: {
                bug: bugDescription,
            },
        });

        if (!isCreated) {
            return NextResponse.json({ success: false, message: "An error occurred while reporting the bug" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Bug reported successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error!!" }, { status: 500 });
        console.error(error);
    }
}

export async function GET() {
    try {
        const bugs = await prisma.bug.findMany();
        return NextResponse.json({ success: true, bugs });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error!!" });
        console.error(error);
    }
}