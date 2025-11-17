import { useEffect, useState } from "react";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/GlobalComponents/Loader/Loader";
import ProductImages from "../../components/ProductDetailsComponents/ProductImages/ProductImages";
import ProductInfo from "../../components/ProductDetailsComponents/ProductInfo/ProductInfo";
import ProductAdditionalInfo from "../../components/ProductDetailsComponents/ProductAdditionalInfo/ProductAdditionalInfo";

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      const data = await response.json();
      setProduct(data.data);
      console.log(data.data);
    };
    fetchProductDetails();
  }, [id]);
  if (!product) {
    return <Loader />;
  }
  return (
    <div className="container mt-3">
      <PagePath path={`${product.name}`} />
      <div className="abd-product-details-container mt-5 p-4 row">
        {/* ===============Product-Images-Start================ */}
        <section className="abd-product-images col-12 col-md-5 col-xl-4">
          <ProductImages product={product} />
        </section>

        {/* ===============Product-Images-End================ */}

        {/* ===============Product-Info-Start================= */}
        <section className="abd-product-info col-12 col-md-7 col-xl-5">
          <ProductInfo product={product} />
        </section>
        {/* ===============Product-Info-End================= */}

        {/* ===============Additional-Info-Start================= */}
        <section className="abd-product-AdditionalInfo col-12 col-md-5 col-xl-3">
          <ProductAdditionalInfo product={product} />
        </section>
        {/* ===============Additional-Info-End================= */}
      </div>
    </div>
  );
}

export default ProductDetails;
