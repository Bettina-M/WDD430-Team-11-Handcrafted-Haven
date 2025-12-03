'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './product.module.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sellerName: string;
  stock: number;
  averageRating: number;
  totalReviews: number;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
      } else {
        setError(data.error || 'Failed to fetch product');
      }
    } catch (err) {
      setError('An error occurred while fetching the product');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please log in to submit a review');
      return;
    }

    const user = JSON.parse(userStr);

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          rating: reviewForm.rating,
          title: reviewForm.title,
          comment: reviewForm.comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReviews([data.review, ...reviews]);
        setReviewForm({ rating: 5, title: '', comment: '' });
        setShowReviewForm(false);
        fetchProduct(); // Refresh product to update rating
        alert('Review submitted successfully!');
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch (err) {
      alert('An error occurred while submitting the review');
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

  if (loading) {
    return <div className={styles.loading}>Loading product...</div>;
  }

  if (error || !product) {
    return <div className={styles.error}>{error || 'Product not found'}</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/marketplace" className={styles.backLink}>
        ← Back to Marketplace
      </Link>

      <div className={styles.productSection}>
        <div className={styles.productImage}>
          {product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <span>🎨</span>
          )}
        </div>

        <div className={styles.productDetails}>
          <h1>{product.name}</h1>
          <p className={styles.seller}>by {product.sellerName}</p>

          <div className={styles.ratingSection}>
            <span className={styles.stars}>
              {renderStars(Math.round(product.averageRating))}
            </span>
            <span className={styles.ratingText}>
              {product.averageRating > 0
                ? `${product.averageRating.toFixed(1)} out of 5 (${product.totalReviews} reviews)`
                : 'No reviews yet'}
            </span>
          </div>

          <div className={styles.price}>${product.price.toFixed(2)}</div>

          <span className={styles.category}>{product.category}</span>

          <p className={styles.description}>{product.description}</p>

          <p className={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          <button
            className={styles.addReviewButton}
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
            <div className={styles.formGroup}>
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                }
                required
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Good</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Poor</option>
                <option value={1}>1 Star - Terrible</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title">Review Title</label>
              <input
                id="title"
                type="text"
                value={reviewForm.title}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, title: e.target.value })
                }
                placeholder="Sum up your review in one line"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="comment">Review</label>
              <textarea
                id="comment"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                placeholder="Share your thoughts about this product"
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Submit Review
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <div className={styles.noReviews}>
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review._id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div>
                    <div className={styles.reviewAuthor}>{review.userName}</div>
                    <div className={styles.reviewDate}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </span>
                </div>
                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
