// types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SellerProfile {
  id: string;
  shopName: string;
  bio: string;
  specialization: string;
  location: string;
  contactEmail: string;
  phoneNumber: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  yearsExperience: number;
  shippingPolicy: string;
  returnPolicy: string;
  userId: string;
  userName: string;
  isSeller: boolean;
  profileCompleted: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
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
  createdAt: string;
}

