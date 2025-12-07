import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {z} from "zod";

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

// Schema Zod (u/ validasi)
const userSchema = z.object({
	name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
	email: z.string().email({ message: "Format email tidak valid" }),
	password: z.string().min(5, { message: "Password minimal 5 karakter" }),
});