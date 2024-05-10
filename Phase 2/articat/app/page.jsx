
import Image from "next/image";
import { React } from 'react'
import Link from 'next/link'
import styles from "./page.module.css";
import Card from "@/app/Card"
import Top3Chart from "@/app/Top3Chart"
import Top3Details from "@/app/Top3Details"
import CustomersPerCountry from "@/app/CustomersPerCountry";
import MonthlyRevenuePerCategory from "@/app/MonthlyRevenuePerCategory";
import Top5Clicks from "@/app/Top5Clicks";
import TopClicksDetails from "@/app/TopClicksDetails";
import Header from "@/app/Header"
// import CategoryPurchaseChart from "@/app/CategoryPurchaseChart";
import articatRepo from "@/app/repo/articat-repo"
import TopContributingCompanies from "./TopContributingCompanies";

import '@/public/css/page.css'

const ArtiCatRepo = new articatRepo()

export default async function Home() {

 const itemids= await ArtiCatRepo.getTop3PurchasedProducts()
 const itemsdetails= await ArtiCatRepo.getitemsDetails(itemids)
 const customersCount = await ArtiCatRepo.getTotalNumberOfCustomersPerCountry()
 const monthlyCategoryRevenue = await ArtiCatRepo.getMonthlyRevenueOfProductsByCategory()
 const clicksOfItem= await ArtiCatRepo.getTopFiveMostClickedProducts()
//  const categoryPurchases= await ArtiCatRepo.getTotalPurchasesCategory()

const top3CompanyUN = await ArtiCatRepo.getTop3Companies()
const top3Companies = await ArtiCatRepo.getCompanyDetails(top3CompanyUN)


  

  return (
    <>
<Header/>

<div>
     

     <div className={styles.noCard}>
     <Card> </Card>
     </div>

     <h2 className={styles.charttitle}>Top 3 Products</h2>
     <div className={styles.top3}>
     <Top3Chart top3Items={itemsdetails}/>
     <Top3Details top3Items={itemsdetails}/>
     </div>

     <div className={styles.twoCards}>
      <div>
      <h2 className={styles.charttitle}>Customers Per Country</h2>
     <div className={styles.centered}>
     <CustomersPerCountry customersPerCountry={customersCount}/>
     </div>
      </div>



      <div>
      <h2 className={styles.charttitle}>Top Contributing Companies</h2>
     <div className={styles.top3}>
     <TopContributingCompanies top3Companies={top3Companies}/>
     </div>
      
      </div>

     </div>

  
     
      <div>
      <h2 className={styles.charttitle}>Monthly Revenue Per Category</h2>
     <div className={styles.centered}>
     <MonthlyRevenuePerCategory monthlyCategoryRevenue={monthlyCategoryRevenue}/>
     </div>
      </div>

      <h2 className={styles.charttitle}>Top 5 Most Clicked Products</h2>
     <div className={styles.top3}>
     <Top5Clicks top5Clicks={clicksOfItem}/>
     <TopClicksDetails top3Items={clicksOfItem}/>
     </div>
    </div>


    </>


    
  )
}
