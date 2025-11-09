import "./Home.css";
import ProductsSlider from "../../components/HomeComponents/ProductsSlider/ProductsSlider.jsx";
import MobileReviewsStatic from "../../components/HomeComponents/SiteReviews/SiteReviews.jsx";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners.jsx";
import { useSelector } from "react-redux";
import HeroSlider from "../../components/HomeComponents/HeroSlider/HeroSlider.jsx";
import FeatureBar from "../../components/HomeComponents/FeatureBar/FeatureBar.jsx";
import BannerGrid from "../../components/HomeComponents/BannerGrid/BannerGrid.jsx";
import CategorySlider from "../../components/HomeComponents/CategorySlider/CategorySlider.jsx";

function Home() {
  const allProducts = useSelector((store) => store.products.data);
  const products = allProducts.filter((p) => p.category?.name != "Laptop");
  const newProducts = allProducts.filter((p) => p.condition == "new");
  const usedProducts = allProducts.filter((p) => p.condition == "used");
  console.log("Products from Redux Store:", products);
  return (
    <>
      {/*geh-Header*/}
      <HeroSlider/>
      <FeatureBar/>
      <CategorySlider/>
      <BannerGrid/>
      
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
