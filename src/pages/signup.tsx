/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// pages/signup.js
import { useState } from 'react';
import styles from '../styles/signup.module.css';
import VerifyOTP from '../pages/verifyOTP'; // Import the VerifyOTP component

interface SignupProps {
  openLoginPage: () => void;
  openOTPPage: () => void;
}
const SignUp: React.FC<SignupProps> = ({ openOTPPage, openLoginPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false); // State to control rendering of OTP component
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to control loading state

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setSuccessMessage(data.message); // Set success message
        setShowOTP(true); // Show OTP component
      } else {
        console.error('Error registering user:', data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    showOTP ? <VerifyOTP email={email} message={successMessage} /> :
    <div className={styles['signup-container']}>
      <div className={styles['signup-form']}>
        <form onSubmit={handleSubmit}>
          <div className={styles['signup-header-container']}>
            <div className={styles['signup-header-text']}>Create your Account</div>
          </div>
          <label htmlFor="Name" style={{color: '#000000', fontSize: '14px'}}>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter" />
          <label htmlFor="Email" style={{color: '#000000', fontSize: '14px'}}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter" />
          <label htmlFor="Password" style={{color: '#000000', fontSize: '14px'}}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter" />
          <button type="submit" disabled={loading} className={loading ? styles.disabledButton : ''}>
  {loading ? 'SIGNING UP...' : 'CREATE ACCOUNT'}
</button>
          <div className={styles['login-link-container']}>
            <div className={styles['login-link']}>
              <div className={styles['login-link-text']} style={{ color: '#333333' }}>Have an Account?</div>
              <div className={styles['login-button-link']} onClick={openLoginPage}>LOGIN</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
