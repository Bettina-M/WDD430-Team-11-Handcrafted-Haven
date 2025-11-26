'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './seller-dashboard.module.css';
import { User, SellerProfile, Product } from '../../types';
import { getSellerProducts, toggleProductStatus, deleteProductFromDB, getSellerStats } from '@/lib/seller'; // or '@/lib/products'

export default function SellerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeListings: 0,
    totalValue: 0
  });

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

    async function fetchData() {
      try {
        const parsedUser: User = JSON.parse(userData!);
        const parsedProfile: SellerProfile = JSON.parse(profile!);
        
        setUser(parsedUser);
        setSellerProfile(parsedProfile);

        // Fetch products and stats from database
        const [sellerProducts, sellerStats] = await Promise.all([
          getSellerProducts(parsedProfile.id), // Use sellerProfile ID, not user ID
          getSellerStats(parsedProfile.id)
        ]);

        // Transform products to match your interface
        const transformedProducts: Product[] = sellerProducts.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          materials: product.materials,
          dimensions: product.dimensions || '',
          weight: product.weight || '',
          images: product.images,
          stock: product.stock,
          tags: product.tags,
          isActive: product.isActive,
          sellerId: product.sellerId,
          sellerName: product.sellerName,
          shopName: product.shopName,
          createdAt: product.createdAt.toISOString()
        }));

        setProducts(transformedProducts);
        setStats(sellerStats);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error loading dashboard data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleToggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      await toggleProductStatus(productId, !currentStatus);
      
      // Update local state
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, isActive: !currentStatus }
          : product
      ));

      // Update stats
      setStats(prev => ({
        ...prev,
        activeListings: currentStatus ? prev.activeListings - 1 : prev.activeListings + 1
      }));

    } catch (error) {
      console.error('Error toggling product status:', error);
      alert('Error updating product status');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteProductFromDB(productId);
      
      // Update local state
      const deletedProduct = products.find(p => p.id === productId);
      setProducts(prev => prev.filter(product => product.id !== productId));

      // Update stats
      setStats(prev => ({
        totalProducts: prev.totalProducts - 1,
        activeListings: deletedProduct?.isActive ? prev.activeListings - 1 : prev.activeListings,
        totalValue: prev.totalValue - (deletedProduct?.price || 0)
      }));

    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>Loading Dashboard...</h2>
          <p>Getting your seller information...</p>
        </div>
      </div>
    );
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
            <p className={styles.statNumber}>{stats.totalProducts}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Active Listings</h3>
            <p className={styles.statNumber}>{stats.activeListings}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Value</h3>
            <p className={styles.statNumber}>
              ${stats.totalValue.toFixed(2)}
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
                      onClick={() => handleToggleProductStatus(product.id, product.isActive)}
                      className={product.isActive ? styles.deactivateBtn : styles.activateBtn}
                    >
                      {product.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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
            {sellerProfile?.bio && (
              <p className={styles.bio}>{sellerProfile.bio}</p>
            )}
            <div className={styles.profileDetails}>
              <span>Member since: {new Date(sellerProfile?.createdAt || '').toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}