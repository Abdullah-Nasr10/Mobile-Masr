import React from "react";
import "./Home.css";
import { products } from "../../components/ApiProducts/Apiproducts.js";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider.jsx";
import Swiper from "../../components/SwiperHeader/Swiper.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import CategoriesContainer from "../CategoriesContainer/CategoriesContainer.jsx";
function Home() {
  const geh_newProducts = products.filter((p) => p.status === "New");
  const geh_usedProducts = products.filter((p) => p.status === "Used");

  return (
    <>
      {/*reh-header*/}
      <Swiper />
      <Icon />
      {/* heb-Categories */}
      <CategoriesContainer />
      {/*geh-Card*/}
      <div className="container mt-5">
        <ProductsSlider title="All Products" products={products} />
        <ProductsSlider title="New Products" products={geh_newProducts} />
        <ProductsSlider title="Used Products" products={geh_usedProducts} />
      </div>
    </>
  );
}

export default Home;
