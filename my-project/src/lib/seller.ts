import { prisma } from './db';

export async function getSellerProducts(sellerId: string) {
  return await prisma.product.findMany({
    where: { sellerId },
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

export async function toggleProductStatus(productId: string, isActive: boolean) {
  return await prisma.product.update({
    where: { id: productId },
    data: { isActive }
  });
}

export async function deleteProductFromDB(productId: string) {
  return await prisma.product.delete({
    where: { id: productId }
  });
}

export async function getSellerStats(sellerId: string) {
  const products = await prisma.product.findMany({
    where: { sellerId }
  });

  const totalProducts = products.length;
  const activeListings = products.filter(p => p.isActive).length;
  const totalValue = products.reduce((total, product) => total + product.price, 0);

  return {
    totalProducts,
    activeListings,
    totalValue
  };
}