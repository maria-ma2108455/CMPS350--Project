'use client'
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer,ComposedChart, Line, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
              Object.entries(productsPerCategory).map(([category, year, revenue]) => ({
                category,
                year,
                "Revenue": revenue,
              }))
            );
          }
        }, [productsPerCategory]);
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={products}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

