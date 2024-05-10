'use client'
import { React, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import styles from "./page.module.css";

// import React, { PureComponent } from 'react';

export default function MonthlyRevenuePerCategory({ monthlyCategoryRevenue }) {

  const [products, setProducts] = useState([]);

  //use staate and use effect to avoid hydration errors
  // if (!productsPerCategory) {
  //     return <p>Loading Data....</p>
  //   }

  function formatMonth(monthYear) {
    const date = new Date(monthYear)
    const format = date.toLocaleString("en-GB", {
      month: "short",
      year: "numeric"
    }).replace(" ","-")
    return format
  }

  useEffect(() => {
    if (monthlyCategoryRevenue) {
      setProducts(  
        monthlyCategoryRevenue.map(row => {
          row[row.category] = row.totalRevenue
          row.MONTH = formatMonth(row.MONTH)
        })
      )
    }
  }, [monthlyCategoryRevenue]);

  if (!monthlyCategoryRevenue) {
    return <p>Loading Data....</p>
  }
  return (
    <ResponsiveContainer width="65%" height={450}>
      <LineChart width={500} height={300} data={monthlyCategoryRevenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="MONTH" padding={{ left: 30, right: 30 }} />
        <YAxis/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Ceramics"
          stroke="#e2cf88"
          activeDot={{ r: 8 }}
          strokeWidth={2.5}
        />
        <Line type="monotone" dataKey="Jewelry" stroke="#f68ba2" strokeWidth={2.5} />
        <Line type="monotone" dataKey="Paintings" stroke="#83ccd2" strokeWidth={2.5}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

