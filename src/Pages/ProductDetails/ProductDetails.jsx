import { useEffect, useState } from "react";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/GlobalComponents/Loader/Loader";
import ProductImages from "../../components/ProductDetailsComponents/ProductImages/ProductImages";
import ProductInfo from "../../components/ProductDetailsComponents/ProductInfo/ProductInfo";
import ProductAdditionalInfo from "../../components/ProductDetailsComponents/ProductAdditionalInfo/ProductAdditionalInfo";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();

        if (!data.data || response.status === 404) {
          navigate("/not-found");
          return;
        }

        setProduct(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, navigate]);

  if (loading) {
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
