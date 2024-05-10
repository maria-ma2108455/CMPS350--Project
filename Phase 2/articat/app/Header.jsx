'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {

    const router = useRouter()

    function onClick() {
        
        delete localStorage.currentUser
        router.push('mainPage.html')
    }

  return (
    <div className="page">

    <header className="head">
        <img src="images/no bg logo.PNG" alt="logo" className="logo" id="logo"></img>
        <div className="top-bar">
          <h1>Dashboard</h1>
          <button className="signInButton" id="signInBtn" onClick={onClick}>Sign Out</button>
        </div>
        {/* <!-- Navigation --> */}
        <nav className="nav">
            <ul className="flex">
                <li><a href="mainpage.html">Basic Statistics</a></li>
                <li><a href="mainpage.html">Top 3 Products</a></li>
                <li><a href="mainpage.html#categories">Top Contributing Companies</a></li>
                <li><a href="mainpage.html#about">Monthly Revenue Per Category</a></li>
                <li><a href="mainpage.html#contact">Customers Per Country</a></li>
                <li><a href="mainpage.html#contact">Top 5 Most Clicked Products</a></li>
            </ul>
        </nav>
    </header>
        {/* page end div */}
        </div> 
  )
}
