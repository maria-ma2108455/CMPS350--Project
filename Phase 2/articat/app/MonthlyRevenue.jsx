'use client'
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import styles from "./page.module.css";

// import React, { PureComponent } from 'react';

export default function MonthlyRevenue({productsPerCategory}){
    const [products, setProducts] = useState([]);

    //use staate and use effect to avoid hydration errors
      if (!productsPerCategory) {
          return <p>Loading Data....</p>
        }
        useEffect(() => {
          if (productsPerCategory) {
            setProducts(
              Object.entries(productsPerCategory).map(([category, month, revenue]) => ({
                category,
                month,
                "Revenue": revenue,
              }))
            );
          }
        }, [productsPerCategory]);
    return (

        <LineChart width={500} height={300} data={products}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Revenue category"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Revenue category" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Revenue category" stroke="#82af8d" />

        </LineChart>
    );
  }

