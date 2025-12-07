// lib/prisma.js
import { PrismaClient } from "@/app/generated/prisma/client";
//import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global;

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}