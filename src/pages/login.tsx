/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import axios from 'axios';
import styles from '../styles/login.module.css';

import 'dotenv/config';

interface LoginProps {
  openSignUpPage: () => void;
  openDashboardPage: () => void;
}

const Login: React.FC<LoginProps> = ({ openSignUpPage, openDashboardPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        localStorage.setItem('jwtToken', response.data.token);
        openDashboardPage();
      } else {
        setError('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      setError('Error occurred while logging in. Please try again.');
    }finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <form onSubmit={handleSubmit}>
          <div className={styles['login-header-container']}>
            <div className={styles['login-header-text']}>Login</div>
            <div className={styles['login-header-text-1']}>Welcome back to ECOMMERCE</div>
            <div className={styles['login-header-text-2']}>The next gen business marketplace</div>
          </div>
          <label htmlFor="Email" style={{ color: '#000000', fontSize: '14px' }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter" />
          <label htmlFor="Password" style={{ color: '#000000', fontSize: '14px' }}>Password</label>
          <div className={styles['password-container']}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter"
          />
          <div
            className={styles['show-password-button']}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </div>
        </div>
          <button type="submit" disabled={loading} className={loading ? styles.disabledButton : ''}>
            {loading ? 'SIGNING UP...' : 'LOGIN'}
          </button>
          <div className={styles['login-link-container']}>
            <div className={styles['login-link']}>
              <div className={styles['login-link-text']} style={{ color: '#333333' }}>Don't have an Account?</div>
              <div className={styles['login-button-link']} onClick={openSignUpPage}>SIGN UP</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
