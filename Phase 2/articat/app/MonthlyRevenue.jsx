'use client'
import  {React, useEffect, useState } from 'react';
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
      // if (!productsPerCategory) {
      //     return <p>Loading Data....</p>
      //   }
        useEffect(() => {
          if (productsPerCategory) {
            console.log(productsPerCategory);
            setProducts(  
              Object.entries(productsPerCategory).map(([category, data]) => ({
                category,
                data: Object.entries(data).map(({month, totalRevenue})=>({
                  month,
                  totalRevenue,
                })),
              }))
            );
          }
        }, [productsPerCategory]);

        if (!productsPerCategory) {
          return <p>Loading Data....</p>
        }
        return(
          
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {products.map((product, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey="revenue"
          data={product.data}
          name={product.category}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
        );
  }

