
import Image from "next/image";
import { React } from 'react'
import styles from "./page.module.css";
import Card from "@/app/Card"
import Top3Chart from "@/app/Top3Chart"
import Top3Details from "@/app/Top3Details"
import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export default async function Home() {

 const itemids= await AtriCatRepo.getTopThreeMostBoughtProducts()
 const itemsdetails= await AtriCatRepo.getitemsDetails(itemids)
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
    </div>
    
  )
}


 

