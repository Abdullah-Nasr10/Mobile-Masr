import React, { useContext } from "react";
import "./Comparison.css";
import CompareContext from "../../context/CompareContext";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";

import TableComparison from "../../components/ComparisonComponents/TableComparison/TableComparison";

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
      <TableComparison compareItems={compareItems} />
    </div>
  );
};

export default Comparison;
