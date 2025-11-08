import "./Home.css";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider.jsx";
import Swiper from "../../components/SwiperHeader/Swiper.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import CategoriesContainer from "../CategoriesContainer/CategoriesContainer.jsx";
import MobileReviewsStatic from "../../components/MobileReviewsStatic.jsx";
import KnowledgeBanners from "../../components/KnowledgeBanners.jsx";
import { useSelector } from "react-redux";

function Home() {
  const products = useSelector((store) => store.products.data);
  const newProducts = products.filter((p) => p.condition === "new");
  const usedProducts = products.filter((p) => p.condition === "used");
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
