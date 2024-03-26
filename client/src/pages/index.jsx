import { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import styles from '../styles/home.module.css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import SignUp from '../pages/signup';
import VerifyOTP from '../pages/verifyOTP';
import Login from  '../pages/login';
import Dashboard from '../pages/dashboard';
const CustomPrevArrow = ({ onClick }) => (
  <div className={styles.customPrevArrow} onClick={onClick}>
    <MdOutlineKeyboardArrowLeft />
  </div>
);

// Custom arrow component for the right arrow
const CustomNextArrow = ({ onClick }) => (
  <div className={styles.customNextArrow} onClick={onClick}>
    <MdOutlineKeyboardArrowRight />
  </div>
);
export default function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: <CustomPrevArrow />, // Custom left arrow
    nextArrow: <CustomNextArrow /> 
  };
  const [currentPage, setCurrentPage] = useState('SignUp');
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setJwtToken(token);
  }, []);

  const handleOpenOTPPage = () => {
    setCurrentPage('OTP');
  };

  const handleOpenDashboardPage = () => {
    setCurrentPage('Dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles['navtop']}>
        <div className={styles['navtop-texts']}>
          <p>Help</p>
          <p>Orders & Returns</p>
          <p>Hi, John</p>
        </div>
      </div>
      {/* Sticky Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Link href="/">
            ECOMMERCE
          </Link>
        </div>
        <div className={styles.navbarCenter}>
          <ul>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/sales">Sales</Link></li>
            <li><Link href="/clearance">Clearance</Link></li>
            <li><Link href="/new-stock">New Stock</Link></li>
            <li><Link href="/trending">Trending</Link></li>
          </ul>
        </div>
        <div className={styles.navbarRight}>
          <Link href="/search">
            <IoSearchOutline size={25} color='black'/>
          </Link>
          <Link href="/cart">
            <CiShoppingCart size={25} color='black'/>
          </Link>
        </div>
      </nav>

      {/* Banner Carousel */}
      <div className={styles.carousel}>
      <Slider {...settings} className={styles.carouselSlider}>
        <div>
          <p style={{fontSize: '12px'}}>Get 10% off on business sign up</p>
        </div>
        <div>
        <p style={{fontSize: '12px'}}>Get 10% off on login</p>
        </div>
        <div>
        <p style={{fontSize: '12px'}}>Get 10% off on staying</p>
        </div>
      </Slider>
      </div>

      <main className={styles.main}>
        {/* Conditionally render based on JWT token presence */}
        {jwtToken ? (
          <Dashboard />
        ) : (
          currentPage === 'Login' ? (
            <Login openSignUpPage={() => setCurrentPage('SignUp')} />
          ) : (
            <SignUp openOTPPage={handleOpenOTPPage} openLoginPage={() => setCurrentPage('Login')}/>
          )
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        {/* Your footer content goes here */}
      </footer>
    </div>
  )
}
