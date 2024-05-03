import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <body>
    
    <div className={styles.page}>


        <hr></hr>

        <main className={styles.main}>
            {/* <!-- slide show code from w3schools --> */}
            {/* <!-- Slideshow container --> */}


              {/* <!-- featured products --> */}
        <section className={styles.featuredProducts} >
            <h2>Featured Products</h2>
            <div className={styles.featuredContainer} id="featured-container"></div>
            <input type="button" value="Shop All" id="shop-btn" ></input>
        </section>

        {/* <!-- about us  --> */}
            <section className={styles.us} id="about">
                <h2 className={styles.title}>What is ArtiCat?</h2>

                <div className={styles.grid}>
                    <article className={styles.grid}>
                        <h2>Craftsmanship and Creativity</h2>
                        <p>Welcome to ArtiCat, the top destination for wonderful handcrafted items! ArtiCat, located in
                            the heart of the digital marketplace, is where creativity meets craftsmanship, with a
                            carefully curated range of ceramics, jewelry, and paintings that inspire and delight.
                        </p>
                    </article>

                    <article className={styles.box}>
                        <h2>Diverse Range of Expression</h2>
                        <p class="">ArtiCat values the impact of art on people's lives and spaces. Each piece in our collection
                            is meticulously crafted by skilled artisans from all over the world, ensuring authenticity,
                            quality, and individuality in every creation. Our wide product line includes anything from
                            delicate porcelain vases to elaborate paintings, capturing the rich tapestry of human
                            expression.
                        </p>
                    </article>

                    <article className={styles.box}>
                        <h2>Community and Connection</h2>
                        <p>Join our community of artisans and enthusiasts who respect quality craftsmanship and
                            innovation. ArtiCat is more than simply a marketplace; it is a movement dedicated to
                            promoting independent creators and self-made businesses and connecting makers and customers.
                            Enjoy the thrill of finding one-of-a-kind treasures that speak to your spirit. Whether
                            you're buying for a particular event or simply seeking self-expression, ArtiCat is here to
                            inspire and encourage you on your journey.
                        </p>
                    </article>
                </div>
            </section>
        </main>
        <footer className={styles.footer}>
            {/* <!-- Contact --> */}
            <section className={styles.contact} id="contact">
                <h3>Have a question? Contact Us!</h3>

                <div className={styles.socials}>
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="https://x.com/articat_?s=21&t=R03n2eSaEpdfP34lExAYdQ" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-youtube"></a>
                    <a href="https://www.instagram.com/articat_2024?igsh=MWZwZGQ3YXVucHk5OQ%3D%3D&utm_source=qr" class="fa fa-instagram"></a>
                    <a href="#" class="fa fa-pinterest"></a>

                    {/* <!-- <a href="#" class="fa fa-xing"></a> --> */}
                </div>
                
            </section>

            <p>&copy; 2024 ArtiCat</p>
            
        </footer>
    </div>
    <script src="js/loadData.js"></script>
    <script src="js/search.js"></script>
    <script src="js/header.js"></script>
    <script src="js/mainpage.js"></script>
    <script src="js/addItem.js"></script>
</body>
    </>

  );
}
