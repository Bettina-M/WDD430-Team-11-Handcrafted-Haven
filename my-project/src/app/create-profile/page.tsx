'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create-profile.module.css';

interface User {
  id: string;
  email: string;
  name: string;
}

interface SellerProfile {
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
}

export default function CreateProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SellerProfile>({
    shopName: '',
    bio: '',
    specialization: '',
    location: '',
    contactEmail: '',
    phoneNumber: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      website: ''
    },
    yearsExperience: 0,
    shippingPolicy: '',
    returnPolicy: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Pre-fill contact email with user's email
      setFormData(prev => ({ 
        ...prev, 
        contactEmail: parsedUser.email,
        shopName: `${parsedUser.name}'s Handcrafted Shop`
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const socialMediaField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialMediaField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'yearsExperience' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to save seller profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const profileData = {
        ...formData,
        userId: user?.id,
        userName: user?.name,
        isSeller: true,
        profileCompleted: true,
        createdAt: new Date().toISOString()
      };
      
      // Save seller profile to localStorage
      localStorage.setItem('sellerProfile', JSON.stringify(profileData));
      
      // Show success message and redirect
      alert('Seller profile created successfully! You can now add your handcrafted items.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating seller profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  const specializations = [
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
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.createProfile}>
        <header className={styles.header}>
          <h1>Become a Seller on Handcrafted Haven</h1>
          <p>Welcome, {user.name}! Set up your seller profile to start selling your handcrafted items.</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Shop Information */}
          <div className={styles.section}>
            <h2>Shop Information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="shopName">Shop Name *</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                required
                placeholder="Enter your shop name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialization">Specialization *</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your craft specialization</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="yearsExperience">Years of Experience</label>
              <input
                type="number"
                id="yearsExperience"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleInputChange}
                min="0"
                max="50"
                placeholder="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">Shop Bio *</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell customers about your craft, inspiration, and story..."
                required
                maxLength={1000}
              />
              <span className={styles.charCount}>{formData.bio.length}/1000</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h2>Contact Information</h2>
            
            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="contactEmail">Contact Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Social Media & Links */}
          <div className={styles.section}>
            <h2>Social Media & Links</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="socialMedia.instagram">Instagram</label>
              <input
                type="url"
                id="socialMedia.instagram"
                name="socialMedia.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourshop"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="socialMedia.facebook">Facebook</label>
              <input
                type="url"
                id="socialMedia.facebook"
                name="socialMedia.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourshop"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="socialMedia.website">Website</label>
              <input
                type="url"
                id="socialMedia.website"
                name="socialMedia.website"
                value={formData.socialMedia.website}
                onChange={handleInputChange}
                placeholder="https://yourshop.com"
              />
            </div>
          </div>

          {/* Store Policies */}
          <div className={styles.section}>
            <h2>Store Policies</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="shippingPolicy">Shipping Policy *</label>
              <textarea
                id="shippingPolicy"
                name="shippingPolicy"
                value={formData.shippingPolicy}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your shipping process, timelines, and costs..."
                required
                maxLength={500}
              />
              <span className={styles.charCount}>{formData.shippingPolicy.length}/500</span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="returnPolicy">Return & Refund Policy *</label>
              <textarea
                id="returnPolicy"
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your return and refund policy..."
                required
                maxLength={500}
              />
              <span className={styles.charCount}>{formData.returnPolicy.length}/500</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Seller Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}