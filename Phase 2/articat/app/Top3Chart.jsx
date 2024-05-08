'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from "./page.module.css";

export default function Top3Chart({top3Items}) {

    if (!top3Items) {
        return <p>....</p>
      }
      const chooseData = top3Items.map(item => ({
        name: item.name,  
        totalQuantitySold: item.totalQuantitySold
      }));
    
        return (
            <>
            <h2 className={styles.charttitle}>Top 3 Products</h2>
          <BarChart
            width={700}
            height={300}
            data={chooseData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={50}
          >
            <XAxis dataKey="name" />
            <YAxis hi/>
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="totalQuantitySold" fill="#d65f83" background={{ fill: '#eee' }} />
          </BarChart>
          </>
        );
      }