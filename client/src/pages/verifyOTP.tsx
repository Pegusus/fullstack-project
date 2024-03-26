/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import styles from '../styles/verifyOTP.module.css';
import OtpInput from 'react18-input-otp';
import axios from 'axios';

function VerifyOTP(props: { email: string; message: string; }) {
    const { email, message } = props;
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (enteredOtp: string) => {
        setOtp(enteredOtp);
    };

    const handleVerify = async () => {
        try {
            setLoading(true);
            // Make API call to verify OTP and get JWT token
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/verify`, {
                verificationKey: message,
                enteredOtp: parseInt(otp),
                check: email
            });
            const { token } = response.data;
            // Store JWT token in localStorage
            localStorage.setItem('jwtToken', token);
            setOtp('');
            setLoading(false);
        } catch (error) {
            setError('Failed to verify OTP. Please try again.');
            console.error('Error verifying OTP:', error);
            setLoading(false);
        }
    };

    return (
        <div className={styles['verifyOTP-container']}>
            <div className={styles['verifyOTP-block']}>
                <div className={styles['verify-email-header']}>Verify Your Email</div>
                <div className={styles['verify-email-text']}>Enter the 6-digit code you received on <b>{email}</b></div>
                <div className={styles['otp-handler']}>
                    <label htmlFor="otp" style={{ fontSize: '13px' }}>Code</label>
                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span style={{ width: '10px' }}></span>}
                        containerStyle={{ marginBottom: '20px', marginTop: '5px' }}
                        inputStyle={{
                            fontSize: '23px',
                            padding: '10px',
                            border: '1px solid #C1C1C1',
                            borderRadius: '6px',
                        }}
                    />
                </div>
                <button
                    type="button"
                    disabled={loading}
                    className={loading ? styles.disabledButton : styles.verifyBtn}
                    onClick={handleVerify} // Call handleVerify function on button click
                >
                    {loading ? 'VERIFYING...' : 'VERIFY'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}

export default VerifyOTP