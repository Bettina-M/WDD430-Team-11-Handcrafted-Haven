import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Your existing functions, now using Prisma
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function createUser(userData: { email: string; name?: string; password: string }) {
  return await prisma.user.create({
    data: userData
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}