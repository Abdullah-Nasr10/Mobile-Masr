import "./Home.css";
import ProductsSlider from "../../components/HomeComponents/ProductsSlider/ProductsSlider.jsx";
import MobileReviewsStatic from "../../components/HomeComponents/SiteReviews/SiteReviews.jsx";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners.jsx";
import { useSelector } from "react-redux";
import HeroSlider from "../../components/HomeComponents/HeroSlider/HeroSlider.jsx";
import FeatureBar from "../../components/HomeComponents/FeatureBar/FeatureBar.jsx";
import BannerGrid from "../../components/HomeComponents/BannerGrid/BannerGrid.jsx";
import CategorySlider from "../../components/HomeComponents/CategorySlider/CategorySlider.jsx";
import Loader from "../../components/GlobalComponents/Loader/Loader.jsx";
import BrandBanners from "../../components/HomeComponents/BrandBanner/BrandBanner.jsx";
import ProductsBanners from "../../components/HomeComponents/ProductsBanner/ProductsBanner.jsx";

function Home() {
  const allProducts = useSelector((store) => store.products.data);
  const isLoading = useSelector((store) => store.products.isLoading);
  if (isLoading && allProducts.length === 0) {
    return <Loader />;
  }
  // const products = allProducts.filter((p) => p.category?.name != "Laptop");
  const newProducts = allProducts.filter((p) => p.condition == "new");
  const usedProducts = allProducts.filter((p) => p.condition == "used");
  // console.log("Products from Redux Store:", allProducts);
  return (
    <>
      {/*geh-Header*/}
      <HeroSlider />
      <FeatureBar />
      <CategorySlider />
      <BannerGrid />

      {/*geh-Card*/}
      <div className="container mt-5">
        <ProductsSlider
          title="All Products"
          products={allProducts}
          seeMoreLink="/category/all"
        />
        <BrandBanners />
        <ProductsSlider
          title="New Products"
          products={newProducts}
          seeMoreLink="/category/all?type=new"
        />
        <ProductsBanners />
        <ProductsSlider
          title="Used Products"
          products={usedProducts}
          seeMoreLink="/category/all?type=used"
        />
      </div>
      <div className="mt-10">
        <MobileReviewsStatic />
      </div>
      <KnowledgeBanners />
    </>
  );
}

export default Home;
