import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../store/slices/VendorSlice";

import Card from "../../components/GlobalComponents/Card/Card";
import VendorContainer from "../../components/GlobalComponents/VendorContainer/VendorContainer";
import Pagination from "../../components/GlobalComponents/Pagination/Pagination";

import "./Vendor.css";
import KnowledgeBanners from "../../components/HomeComponents/KnowledgeBanners/KnowledgeBanners.jsx";

function Vendor() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allProducts = useSelector((store) => store.products.data);
  const vendor = useSelector((store) => store.vendors.data);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchVendorData(id));
  }, [dispatch, id]);

  if (!vendor) {
    return (
      <div className="reh-fs-1 reh-text-center reh-mt-5">Loading vendor...</div>
    );
  }

  const vendorProducts = allProducts.filter(
    (product) => product?.vendor?._id?.toString() === id
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = vendorProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="reh-container reh-py-5">
        <div className="row">
          <div className="col-12 col-lg-3 g-10">
            <VendorContainer vendor={vendor} />
          </div>

          <div className="col-12 col-lg-9">
            {vendorProducts.length > 0 ? (
              <>
                <div className="vendor-products-row">
                  {currentProducts.map((product) => (
                    <div key={product._id} className="vendor-product-col">
                      <Card product={product} />
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalProducts={vendorProducts.length}
                  productsPerPage={productsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="reh-text-center reh-fs-4">
                No products for this vendor yet.
              </div>
            )}
          </div>
        </div>
      </div>
      <KnowledgeBanners />
    </>
  );
}

export default Vendor;
