     import React from "react"
     import CardProduct from '../components/CardProduct';
     import OffersCard from '../components/Offers';
     import OurStores from '../components/OurStores';
     import News from '../components/News';
     import Products from '../assets/products.png';
     import { IoIosArrowForward } from "react-icons/io";
   const Mainpage =() => {
    return(
      <>
      <div className="banner">
        <img src={Products} alt="products" />
        <h1>Доставка бесплатно от 1000 ₽</h1>
     </div>
     <div className="main">   
     <div className="sale">
     <div className="sale-head">
        <h1>Акции</h1>
        <a href="#">Все акции <IoIosArrowForward /> </a>
      </div>
      <CardProduct showSale/>
     </div>
     <div className="new-product">
     <div className="sale-head">
        <h1>Новинки</h1>
        <a href="#">Все новинки<IoIosArrowForward /> </a>
        </div>
      <CardProduct/>
     </div>
     <div className="last-product">
     <div className="sale-head">
        <h1>Покупали раньше</h1>
        <a href="#">Все покупки<IoIosArrowForward /> </a>
        </div>
      <CardProduct/>
     </div>
     <div className="offers">
        <div className="sale-head">
          <h1>Специальные предложения</h1>
        </div>
        <div className="card-offers">
          <OffersCard/>
        </div>
     </div>
     <div className="our-stores">
        <div className="sale-head">
          <h1>Наши магазины</h1>
        </div>
        <OurStores/>
     </div>
     <div className="news-section">
     <div className="sale-head">
          <h1>Новости</h1>
        <a href="#">Все статьи<IoIosArrowForward /> </a>
      </div>
      <News/>
     </div>
     </div>  
     </>
    )
   };
   export default Mainpage