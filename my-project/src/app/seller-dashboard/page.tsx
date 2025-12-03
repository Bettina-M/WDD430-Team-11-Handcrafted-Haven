'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './seller-dashboard.module.css';
import { User, SellerProfile, Product } from '../../types';

export default function SellerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const profile = localStorage.getItem('sellerProfile');

    if (!token || !userData) {
      router.push('/auth');
      return;
    }

    if (!profile) {
      router.push('/create-profile');
      return;
    }

    try {
      const parsedUser: User = JSON.parse(userData);
      const parsedProfile: SellerProfile = JSON.parse(profile);
      const productsData: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Filter products for this seller
      const sellerProducts = productsData.filter((product: Product) => product.sellerId === parsedUser.id);
      
      setUser(parsedUser);
      setSellerProfile(parsedProfile);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Error parsing data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const toggleProductStatus = (productId: string) => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive }
        : product
    );
    
    setProducts(updatedProducts);
    
    // Update localStorage
    const allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedAllProducts = allProducts.map((product: Product) => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive }
        : product
    );
    localStorage.setItem('products', JSON.stringify(updatedAllProducts));
  };

  const deleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      
      // Update localStorage
      const allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedAllProducts = allProducts.filter((product: Product) => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedAllProducts));
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1>{sellerProfile?.shopName}</h1>
              <p>Seller Dashboard</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/add-product" className={styles.primaryButton}>
                Add New Product
              </Link>
              <Link href="/dashboard" className={styles.secondaryButton}>
                Back to Main Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Products</h3>
            <p className={styles.statNumber}>{products.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Active Listings</h3>
            <p className={styles.statNumber}>
              {products.filter(p => p.isActive).length}
            </p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Value</h3>
            <p className={styles.statNumber}>
              ${products.reduce((total, product) => total + product.price, 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className={styles.productsSection}>
          <div className={styles.sectionHeader}>
            <h2>Your Products</h2>
            <span className={styles.productCount}>({products.length} items)</span>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No products yet</h3>
              <p>Start by adding your first handcrafted item!</p>
              <Link href="/add-product" className={styles.primaryButton}>
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={200}
                        height={150}
                        className={styles.image}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                    <div className={styles.productStatus}>
                      <span className={product.isActive ? styles.active : styles.inactive}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <p className={styles.productDescription}>
                      {product.description.substring(0, 100)}...
                    </p>
                    <div className={styles.productDetails}>
                      <span className={styles.price}>${product.price.toFixed(2)}</span>
                      <span className={styles.stock}>Stock: {product.stock}</span>
                    </div>
                    <div className={styles.productTags}>
                      {product.tags.slice(0, 3).map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.productActions}>
                    <button
                      onClick={() => toggleProductStatus(product.id)}
                      className={product.isActive ? styles.deactivateBtn : styles.activateBtn}
                    >
                      {product.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.profileSection}>
          <h2>Your Seller Profile</h2>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <h3>{sellerProfile?.shopName}</h3>
              <Link href="/create-profile" className={styles.editButton}>
                Edit Profile
              </Link>
            </div>
            <p className={styles.specialization}>
              Specialization: {sellerProfile?.specialization}
            </p>
            <p className={styles.bio}>{sellerProfile?.bio}</p>
            <div className={styles.profileDetails}>
              <span>📍 {sellerProfile?.location}</span>
              <span>📧 {sellerProfile?.contactEmail}</span>
              {sellerProfile?.phoneNumber && <span>📞 {sellerProfile.phoneNumber}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}