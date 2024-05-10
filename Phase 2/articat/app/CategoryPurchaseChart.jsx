'use client'
// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import styles from "./page.module.css";

// export default function CategorySalesChart({ categoryPurchases }) {
//     const [categoryPurchase, setCategoryPurchases] = useState([]);



//   if (!categoryPurchases) {
//     return <p>Loading Data....</p>;
//   }
//   useEffect(() => {
//     // Assuming salesData is already in the correct format [{ category, count }]
//     if (categoryPurchases) {
//         setCategoryPurchases(categoryPurchases.map(sale => ({
//         name: sale.category, 
//         "Total Items Sold": 
//       })));
//     }
//   }, [categoryPurchases]);

 
//   return (
//     <ResponsiveContainer width="95%" height={450}>
//       <BarChart
//         data={categoryPurchase}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         barSize={70}
//       >
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <CartesianGrid strokeDasharray="3 3" />
//         <Bar dataKey="Total Items Sold" fill="#8884d8" background={{ fill: '#eee' }} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
