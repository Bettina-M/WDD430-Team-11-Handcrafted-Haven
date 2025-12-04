'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './add-product.module.css';
import { User, SellerProfile, Product } from '@/types';

interface ProductFormData {
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
}

export default function AddProductPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    materials: [],
    dimensions: '',
    weight: '',
    images: [],
    stock: 1,
    tags: [],
    isActive: true
  });

  const [currentMaterial, setCurrentMaterial] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const profile = localStorage.getItem('sellerProfile');

    if (!token || !userData) {
      router.push('/auth');
      return;
    }

    if (!profile) {
      alert('Please complete your seller profile first!');
      router.push('/create-profile');
      return;
    }

    try {
      const parsedUser: User = JSON.parse(userData);
      const parsedProfile: SellerProfile = JSON.parse(profile);
      setUser(parsedUser);
      setSellerProfile(parsedProfile);
    } catch (error) {
      console.error('Error parsing data:', error);
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const addMaterial = () => {
    if (currentMaterial.trim() && !formData.materials.includes(currentMaterial.trim())) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, currentMaterial.trim()]
      }));
      setCurrentMaterial('');
    }
  };

  const removeMaterial = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== material)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check file type
        if (!file.type.startsWith('image/')) {
          alert('Please upload only image files');
          continue;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB');
          continue;
        }

        const base64 = await convertToBase64(file);
        newImages.push(base64);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare product data for API
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        images: formData.images,
        sellerId: user?.id || '',
        sellerName: sellerProfile?.shopName || user?.name || '',
        stock: formData.stock
      };

      // Send to MongoDB via API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Product added successfully! It will appear in the marketplace.');
        router.push('/marketplace');
      } else {
        throw new Error(data.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error adding product: ${error instanceof Error ? error.message : 'Please try again'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Jewelry & Accessories',
    'Home Decor',
    'Art & Paintings',
    'Textiles & Fabrics',
    'Woodworking',
    'Pottery & Ceramics',
    'Candles & Soaps',
    'Leather Goods',
    'Metal Work',
    'Paper Crafts',
    'Toys & Games',
    'Clothing & Apparel',
    'Other'
  ];

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.addProduct}>
        <header className={styles.header}>
          <h1>Add New Product</h1>
          <p>List your handcrafted item on {sellerProfile?.shopName}</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Information */}
          <div className={styles.section}>
            <h2>Product Information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Beautiful Handcrafted Necklace"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe your product in detail. Include materials used, craftsmanship techniques, and unique features..."
                required
                maxLength={2000}
              />
              <span className={styles.charCount}>{formData.description.length}/2000</span>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="1"
                  required
                  placeholder="1"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Materials */}
          <div className={styles.section}>
            <h2>Materials & Specifications</h2>
            
            <div className={styles.formGroup}>
              <label>Materials Used *</label>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={currentMaterial}
                  onChange={(e) => setCurrentMaterial(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  placeholder="Add materials (e.g., Silver, Gemstones)"
                />
                <button type="button" onClick={addMaterial} className={styles.addButton}>
                  Add
                </button>
              </div>
              <div className={styles.tags}>
                {formData.materials.map(material => (
                  <span key={material} className={styles.tag}>
                    {material}
                    <button type="button" onClick={() => removeMaterial(material)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="dimensions">Dimensions</label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 10x5x2 cm"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="e.g., 150g"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={styles.section}>
            <h2>Product Images</h2>
            
            <div className={styles.formGroup}>
              <label>Upload Images *</label>
              <div className={styles.uploadArea}>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={styles.fileInput}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className={styles.uploadLabel}>
                  <div className={styles.uploadContent}>
                    <div className={styles.uploadIcon}>📁</div>
                    <div className={styles.uploadText}>
                      <strong>Click to upload images</strong>
                      <span>or drag and drop</span>
                      <small>PNG, JPG, GIF up to 5MB each</small>
                    </div>
                  </div>
                </label>
                {uploading && (
                  <div className={styles.uploading}>Uploading images...</div>
                )}
              </div>
              
              {formData.images.length > 0 && (
                <div className={styles.imagePreviews}>
                  {formData.images.map((image, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className={styles.previewImage}
                      />
                      <button 
                        type="button" 
                        onClick={() => removeImage(image)}
                        className={styles.removeImageBtn}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className={styles.section}>
            <h2>Product Tags</h2>
            
            <div className={styles.formGroup}>
              <label>Tags</label>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags (e.g., handmade, vintage, eco-friendly)"
                />
                <button type="button" onClick={addTag} className={styles.addButton}>
                  Add
                </button>
              </div>
              <div className={styles.tags}>
                {formData.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => router.push('/seller-dashboard')}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || uploading}
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}