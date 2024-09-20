import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create the Prisma client with the Accelerate extension
const createPrismaClient = () => {
    return new PrismaClient().$extends(withAccelerate());
};

// Augment the global namespace for TypeScript
declare global {
    var prisma: PrismaClient | undefined;
}

// Use globalThis to persist the Prisma client in development
const prisma = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
