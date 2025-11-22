import React, { useContext } from "react";
import { IoGitCompareOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { MdArrowForwardIos } from "react-icons/md";
import "./CompareList.css";
import CompareContext from "../../../context/CompareContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CompareList() {
  const [showCompareList, setShowCompareList] = React.useState(false);
  const { compareItems, setCompareItems } = useContext(CompareContext);
  return (
    <>
      <div className="abd-compareList">
        <div
          className="abd-compareListBtn d-flex align-items-center gap-2 "
          onClick={() => setShowCompareList(!showCompareList)}
        >
          <IoGitCompareOutline />
          <div>compare</div>
          <div className="abd-numOfCompared center">{compareItems.length}</div>
        </div>
        {/* ===============compare-list-items=============== */}
        <div
          className={`abd-compareListItems p-4 ${
            showCompareList ? " show" : ""
          }`}
        >
          {compareItems.length === 0 ? (
            <div className="abd-emptyCompareList p-3 text-center fs-5">
              No items to compare
            </div>
          ) : (
            <>
              <div className="abd-compareListHeader p-3 fw-semibold d-flex justify-content-between align-items-center">
                <div className="fs-4">Comparison List</div>
                <Link
                  to={compareItems.length < 2 ? "#" : "/comparison"}
                  onClick={() => {
                    if (compareItems.length < 2) {
                      toast.error("Please add at least two items to compare.");
                    }
                  }}
                  className="abd-goToCompareBtn"
                  style={{
                    color: "var(--orange-color)",
                    textDecoration: "underline",
                  }}
                >
                  Go To Compare <MdArrowForwardIos />
                </Link>
              </div>

              {compareItems.map((item) => (
                <div
                  key={item._id}
                  className="abd-compareListItem row align-items-center p-3 border rounded-2 mb-3"
                >
                  {/* ============prod-image============ */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="col-3 img-fluid"
                  />
                  {/* ============prod-name============ */}
                  <div className="abd-compareItemInfo col-7 text-truncate fs-5">
                    {item.name}
                  </div>
                  {/* ============delete-btn============ */}
                  <div
                    className="abd-deleteCompareItemBtn col-2 center text-danger"
                    onClick={() => {
                      setCompareItems(
                        compareItems.filter((i) => i._id !== item._id)
                      );
                      localStorage.setItem(
                        "compareItems",
                        JSON.stringify(
                          compareItems.filter((i) => i._id !== item._id)
                        )
                      );
                    }}
                  >
                    <TiDeleteOutline size={20} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CompareList;
