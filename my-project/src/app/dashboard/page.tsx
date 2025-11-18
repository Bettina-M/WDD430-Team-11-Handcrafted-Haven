'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      // Redirect to auth page if not authenticated
      router.push('/auth');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }
  //This leads to create profile page
  
  const handleCreateProfile = () => {
    // Navigate to the create profile page
    router.push('/create-profile');
  };

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
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Welcome to Your Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>
        
        <div className={styles.content}>
          <div className={styles.card}>
            <h2>User Information</h2>
            <div className={styles.userInfo}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          </div>


          <div className={styles.card}>
            <h2>Your Account</h2>
            <p>You have successfully logged in to Handcrafted Haven!</p>
            <p>This is a protected dashboard page that requires authentication.</p>
          </div>

          <div className={styles.card}>
            <h2>Complete Your Profile</h2>
            <p>Welcome to Handcrafted Haven! To get the most out of your experience, please complete your profile.</p>
            <button 
              onClick={handleCreateProfile} 
              className={styles.createProfileButton}
            >
              {user.name}, create your profile
            </button>
          </div>

          <div className={styles.card}>
            <h2>Seller Tools</h2>
            <p>Manage your handcrafted items and seller profile.</p>
            <div className={styles.buttonGroup}>
              <button 
                onClick={() => router.push('/seller-dashboard')} 
                className={styles.primaryButton}
              >
                View Seller Dashboard
              </button>
              <button 
                onClick={() => router.push('/add-product')} 
                className={styles.secondaryButton}
              >
                Add New Product
              </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
