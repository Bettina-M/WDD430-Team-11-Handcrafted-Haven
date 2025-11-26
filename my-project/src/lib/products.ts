import { prisma } from './db';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  materials: string[];
  dimensions?: string;
  weight?: string;
  images: string[];
  stock: number;
  tags: string[];
  isActive: boolean;
  sellerId: string;
  sellerName: string;
  shopName: string;
}

export async function createProduct(productData: CreateProductData) {
  return await prisma.product.create({
    data: productData
  });
}

export async function getProductsBySeller(sellerId: string) {
  return await prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id }
  });
}

export async function updateProduct(id: string, data: Partial<CreateProductData>) {
  return await prisma.product.update({
    where: { id },
    data
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id }
  });
}

