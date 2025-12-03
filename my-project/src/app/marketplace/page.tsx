'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './marketplace.module.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sellerName: string;
  averageRating: number;
  totalReviews: number;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      params.append('sortBy', filters.sortBy);
      params.append('order', filters.order);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#ffa500' : '#ddd' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Marketplace</h1>
      </header>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Pottery">Pottery</option>
            <option value="Textiles">Textiles</option>
            <option value="Woodwork">Woodwork</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Art">Art</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="averageRating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="order">Order</label>
          <select
            id="order"
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {loading && <div className={styles.loading}>Loading products...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className={styles.noProducts}>
          No products found. Try adjusting your filters.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <div className={styles.productCard}>
                <div className={styles.productImage}>
                  {product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <span>🎨</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productSeller}>by {product.sellerName}</p>
                  
                  <div className={styles.productRating}>
                    <span className={styles.stars}>
                      {renderStars(Math.round(product.averageRating))}
                    </span>
                    <span className={styles.ratingText}>
                      {product.averageRating > 0 
                        ? `${product.averageRating.toFixed(1)} (${product.totalReviews})`
                        : 'No reviews yet'}
                    </span>
                  </div>

                  <div className={styles.productPrice}>
                    ${product.price.toFixed(2)}
                  </div>
                  
                  <span className={styles.productCategory}>{product.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
