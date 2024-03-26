/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type Category from '../interfaces/category.interface';

import 'dotenv/config';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    // Check if the token is present in local storage
    if (!token) {
      // If token is not present, redirect to the login page
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: { categories: Category[] } = await response.json();
        setCategories(result?.categories);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div>Error: {error}</div>}
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <p>{category.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
