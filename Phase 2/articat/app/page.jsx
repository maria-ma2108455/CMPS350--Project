
import Image from "next/image";
import { React } from 'react'
import styles from "./page.module.css";
import Card from "@/app/Card"
import Top3Chart from "@/app/Top3Chart"
import Top3Details from "@/app/Top3Details"
import CustomersPerCountry from "@/app/CustomersPerCountry";
import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export default async function Home() {

 const itemids= await ArtiCatRepo.getTopThreeMostBoughtProducts()
 const itemsdetails= await ArtiCatRepo.getitemsDetails(itemids)
 const customersCount = await ArtiCatRepo.getTotalNumberOfCustomersPerCountry()
  return (
    <div>
     <h1>Dashboard</h1>

     <div className={styles.noCard}>
     <Card> </Card>
     </div>

     <h2 className={styles.charttitle}>Top 3 Products</h2>
     <div className={styles.top3}>
     <Top3Chart top3Items={itemsdetails}/>
     <Top3Details top3Items={itemsdetails}/>
     </div>

     <h2 className={styles.charttitle}>Customer Per Country</h2>
     <div className={styles.top3}>
     <CustomersPerCountry customersPerCountry={customersCount}/>
     </div>
    </div>
    
  )
}


 

