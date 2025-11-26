import { prisma } from './db';

export async function getAllActiveProducts() {
  return await prisma.product.findMany({
    where: { 
      isActive: true,
      stock: { gt: 0 } // Only show products with stock
    },
    orderBy: { createdAt: 'desc' },
    include: {
      seller: {
        select: {
          shopName: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}

export async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: { 
      category,
      isActive: true,
      stock: { gt: 0 }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      seller: {
        select: {
          shopName: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}

export async function searchProducts(searchTerm: string) {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      stock: { gt: 0 },
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { tags: { has: searchTerm } },
        { materials: { has: searchTerm } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      seller: {
        select: {
          shopName: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}