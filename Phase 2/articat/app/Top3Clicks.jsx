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
  ResponsiveContainer
} from "recharts";
import styles from "./page.module.css";

export default function Top3Chart({ top3Clicks }) {
  const [items, setItems] = useState([]);

  //use staate and use effect to avoid hydration errors
  if (!top3Clicks) {
    return <p>....</p>
  }
  useEffect(() => {
    if (top3Clicks) {
      setItems(
        top3Clicks.map((item) => ({
          name: item.name,
          "Number Of Clicks": item.clicks,
        }))
      );
    }
  }, [top3Clicks])

  return (

    <ResponsiveContainer width="65%" height={400}>
      <BarChart
        width={650}
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
          dataKey="Number Of Clicks"
          fill="#d65f83"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
