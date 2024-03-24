/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React, { useEffect, useState } from 'react';
import type Category from '../interfaces/category.interface';

const DashboardPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhbmlzaW1hQGdtYWlsLmNvIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3MTEyNzMzMTcsImV4cCI6MTcxMTMxNjUxN30.m8_3KOQUktg4vc0ERvApwk8zbx0BBLxCcy4eNroHkb4'
        const response = await fetch('http://localhost:3333/categories/', {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const result: any = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setCategories(result?.categories);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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
