import React, { useContext } from "react";
import "./Comparison.css";
import CompareContext from "../../context/CompareContext";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";
const Comparison = () => {
  const { compareItems } = useContext(CompareContext);
  if (compareItems.length === 0) {
    return (
      <div className="container pt-4">
        <PagePath path="Comparison" />
        <div className="abd-emptyCompare p-3 text-center fs-5">
          No items to compare
        </div>
      </div>
    );
  }
  return (
    <div className="container pt-4">
      <PagePath path="Comparison" />
      <div>
        {/* Render comparison details here */}
        <div className="abd-comparison-grid row row-cols-3">
          {compareItems.map((item) => (
            <div key={item._id} className="col">
              <div className="abd-comparison-card p-3 m-2 border rounded-2">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="abd-comparison-image mb-3 img-fluid"
                />
                <h4 className="abd-comparison-title mb-2">{item.name}</h4>
                <div className="abd-comparison-price mb-2">
                  Price: {item.priceAfterDiscount} EGP
                </div>
                <div className="abd-comparison-vendor">
                  Vendor: {item.vendor.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comparison;
