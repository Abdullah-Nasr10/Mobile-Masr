import "./Home.css";
import ProductsSlider from "../../components/HomeComponents/ProductsSlider/ProductsSlider.jsx";
import Swiper from "../../components/HomeComponents/SwiperHeader/Swiper.jsx";
import Icon from "../../components/HomeComponents/Features/Features.jsx";
import CategoriesContainer from "../../components/HomeComponents/CategoriesContainer/CategoriesContainer.jsx";
import MobileReviewsStatic from "../../components/HomeComponents/SiteReviews/SiteReviews.jsx";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners.jsx";
import { useSelector } from "react-redux";

function Home() {
  const allProducts = useSelector((store) => store.products.data);
  const products = allProducts.filter((p) => p.category?.name != "Laptop");
  const newProducts = allProducts.filter((p) => p.condition == "new");
  const usedProducts = allProducts.filter((p) => p.condition == "used");
  console.log("Products from Redux Store:", products);
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
        <ProductsSlider title="New Products" products={newProducts} />
        <ProductsSlider title="Used Products" products={usedProducts} />
      </div>
      <div className="mt-10">
        <MobileReviewsStatic />
      </div>
      <KnowledgeBanners />
    </>
  );
}

export default Home;
