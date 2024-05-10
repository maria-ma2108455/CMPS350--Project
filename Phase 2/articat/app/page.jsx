
import Image from "next/image";
import { React } from 'react'
import styles from "./page.module.css";
import Card from "@/app/Card"
import Top3Chart from "@/app/Top3Chart"
import Top3Details from "@/app/Top3Details"
import CustomersPerCountry from "@/app/CustomersPerCountry";
import MonthlyRevenue from "@/app/MonthlyRevenue";
import Top5Clicks from "@/app/Top5Clicks";
import TopClicksDetails from "@/app/TopClicksDetails";
// import CategoryPurchaseChart from "@/app/CategoryPurchaseChart";
import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export default async function Home() {

 const itemids= await ArtiCatRepo.getTop3PurchasedProducts()
 const itemsdetails= await ArtiCatRepo.getitemsDetails(itemids)
 const customersCount = await ArtiCatRepo.getTotalNumberOfCustomersPerCountry()
 const monthlyProductsRevenue = await ArtiCatRepo.getMonthlyRevenueOfProductsByCategory()
 const clicksOfItem= await ArtiCatRepo.getTopFiveMostClickedProducts()
//  const categoryPurchases= await ArtiCatRepo.getTotalPurchasesCategory()

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

     {/* <h2 className={styles.charttitle}>No. Of Purchases Per Category</h2>
     <div className={styles.top3}>
     <CategoryPurchaseChart categoryPurchases={categoryPurchases}/>
     </div> */}

     <div className={styles.twoCards}>
      <div>
      <h2 className={styles.charttitle}>Customers Per Country</h2>
     <div className={styles.centered}>
     <CustomersPerCountry customersPerCountry={customersCount}/>
     </div>
      </div>

      <div>
      <h2 className={styles.charttitle}>Monthly Revenue</h2>
     <div className={styles.centered}>
     <MonthlyRevenue productsPerCategory={monthlyProductsRevenue}/>
     </div>
      </div>

      <div>
      <h2 className={styles.charttitle}>Top 5 Most Clicked Items</h2>
     <div className={styles.top3}>
     <Top5Clicks top5Clicks={clicksOfItem}/>
     <TopClicksDetails top3Items={clicksOfItem}/>
     </div>
      </div>

     </div>
    </div>
    
  )
}


 

