// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    // 1. Ambil Token dari Header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Unauthorized: Token Missing" },
            { status: 401 }
        );
    }

    const token = authHeader.split(" ")[1];  // Ambil String setelah "Bearer"

    try {
        // 2. Verifikasi Token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        // 3. Jika Sukses, Lanjut!
        return NextResponse.next();

    } catch (error) {
        // 4. Jika Token Salah/Expired
        return NextResponse.json(
            { message: "Unauthorized: Invalid Token" },
            { status: 401 }
        );
    }
}

// Mengatur Macther (Route Tertentu)
export const config = {
    // Tentukan route mana yang difilter middleware ini
    // Misal: Semua route di dalam /api/products dan /api/users
    matcher: ["/api/products/:path*", "/api/users/:path*"],
};