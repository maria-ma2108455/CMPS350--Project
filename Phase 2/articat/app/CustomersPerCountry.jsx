'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from "./page.module.css";

export default function CustomersPerCountry({customersPerCountry}) {
    const [customers, setCustomers] = useState([]);

  //use staate and use effect to avoid hydration errors
    if (!customersPerCountry) {
        return <p>Loading Data....</p>
      }
      useEffect(() => {
        if (customersPerCountry) {
          setCustomers(
            Object.entries(customersPerCountry).map(([country, count]) => ({
              country,
              "Number Of Customers": count,
            }))
          );
        }
      }, [customersPerCountry]);
    
        return (
            <>
             <div className={styles.barChart}>
          <BarChart
          
            width={600}
            height={400}
            data={customers}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={70}
          >
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="2 1" />
            <Bar dataKey="Number Of Customers" fill="#d65f83" background={{ fill: '#eee' }} />
          </BarChart>
          </div>
          </>
        );
      }