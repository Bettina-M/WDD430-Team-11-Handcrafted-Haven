'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './marketplace.module.css';
import { getAllActiveProducts } from '@/lib/marketplace';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  materials: string[];
  images: string[];
  stock: number;
  tags: string[];
  isActive: boolean;
  sellerName: string;
  shopName: string;
  createdAt: string;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const productsData = await getAllActiveProducts();
        
        // Transform the data to match your existing Product interface
        const transformedProducts: Product[] = productsData.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          materials: product.materials,
          images: product.images,
          stock: product.stock,
          tags: product.tags,
          isActive: product.isActive,
          sellerName: product.seller.user.name || 'Unknown Artist',
          shopName: product.seller.shopName,
          createdAt: product.createdAt.toISOString()
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.materials.some(material => material.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  );

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>Loading Marketplace...</h2>
          <p>Discovering beautiful handcrafted items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.marketplace}>
        <header className={styles.header}>
          <h1>Handcrafted Haven Marketplace</h1>
          <p>Discover unique handcrafted items from talented artisans</p>
        </header>

        <div className={styles.filters}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search products, tags, materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.categoryFilter}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.stats}>
          <p>Showing {filteredProducts.length} of {products.length} products</p>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={200}
                    className={styles.image}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.shopName}>By {product.shopName}</p>
                <p className={styles.description}>
                  {product.description.substring(0, 120)}...
                </p>
                <div className={styles.productDetails}>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                  <span className={styles.stock}>{product.stock} in stock</span>
                </div>
                <div className={styles.materials}>
                  <strong>Materials:</strong> {product.materials.slice(0, 3).join(', ')}
                  {product.materials.length > 3 && '...'}
                </div>
                <div className={styles.tags}>
                  {product.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.productActions}>
                <button className={styles.addToCartBtn}>
                  Add to Cart
                </button>
                <button className={styles.wishlistBtn}>
                  ♡ Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            {(selectedCategory !== 'All' || searchTerm) && (
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                className={styles.clearFiltersBtn}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}