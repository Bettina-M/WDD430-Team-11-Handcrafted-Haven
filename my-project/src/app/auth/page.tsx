'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import styles from './auth.module.css';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${showLogin ? styles.activeTab : ''}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${!showLogin ? styles.activeTab : ''}`}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        {showLogin ? (
          <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}
