import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Ambil semua data user
export async function GET() {
	const users = await prisma.user.findMany();
	return NextResponse.json(users);
}

// POST: Tambah user baru
export async function POST(request) {
	const data = await request.json();
	const userBaru = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: data.password,
		},
	});
	
	return NextResponse.json(userBaru);
}
