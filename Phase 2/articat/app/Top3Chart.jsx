"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./page.module.css";

export default function Top3Chart({ top3Items }) {
  const [items, setItems] = useState([]);

  //use staate and use effect to avoid hydration errors
  if (!top3Items) {
    return <p>....</p>;
  }
  useEffect(() => {
    if (top3Items) {
      setItems(
        top3Items.map((item) => ({
          name: item.name,
          "Total Quantity Sold": item.totalQuantitySold,
        }))
      );
    }
  }, [top3Items]);

  return (
    <ResponsiveContainer width="65%" height={450}>
      <BarChart
        width={600}
        height={400}
        data={items}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={70}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="2 1" />
        <Bar
          dataKey="Total Quantity Sold"
          fill="#d65f83"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
