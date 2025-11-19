import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import "./PagePath.css";
import { Link } from "react-router-dom";
function PagePath({ path }) {
  return (
    <div
      className="d-flex align-items-center gap-2 pb-2 mb-4 fw-semibold"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      <Link
        to="/"
        className="abd-home d-flex align-items-center gap-2 text-muted"
      >
        <IoHomeOutline size={20} />
        <div className="fs-4">Home</div>
        <MdArrowForwardIos size={14} />
      </Link>
      <div
        className="fs-4"
        style={{
          color: "var(--orange-color-2)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          minWidth: 0,
        }}
      >
        {path}
      </div>
    </div>
  );
}

export default PagePath;
