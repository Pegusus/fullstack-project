/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type Category from '../interfaces/category.interface';
import styles from '../styles/dashboard.module.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import 'dotenv/config';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    // Check if the token is present in local storage
    if (!token) {
      // If token is not present, redirect to the login page
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?page=${currentPage}&limit=6`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: { categories: Category[], pageInfo: any } = await response.json();
        setTotalPages(result.pageInfo?.totalPages);
        setCategories(result?.categories);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [router, currentPage]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <div className={styles['dashboard-container']}>
      <div className={styles['dashboard-box']}>
        <div className={styles['dashboard-header-text']}>Please mark your interests!</div>
        <div className={styles['dashboard-header-text-1']}>We will keep you notified</div>
        <div className={styles['dashboard-box-content']}>
          <div style={{fontSize: '13px', marginBottom: '10px'}}>My saved interests</div>
          <div>
          {categories.map((category, index) => (
            <div key={category.id} className={styles['category-item']}>
              <input type="checkbox" id={category.id.toString()} name={category.displayName} />
              <label htmlFor={category.id.toString()}>{category.displayName}</label>
            </div>
          ))}
        </div>
        </div>
        <div className={styles['dashboard-footer']}>
        <MdKeyboardArrowLeft onClick={handlePrevPage} style={{cursor: 'pointer'}}/>
        {Array.from({ length: totalPages }, (_, index) => (
          <span key={index + 1} onClick={() => handlePageClick(index + 1)} style={{marginRight: '5px', cursor: 'pointer', fontWeight: currentPage === index + 1 ? 'bold' : 'normal'}}>{index + 1}</span>
        ))}
        <MdKeyboardArrowRight onClick={handleNextPage} style={{cursor: 'pointer'}}/>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;
