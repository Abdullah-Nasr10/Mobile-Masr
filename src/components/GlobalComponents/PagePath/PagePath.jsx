import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import "./PagePath.css";
function PagePath({ path }) {
  return (
    <div
      className="d-flex align-items-center gap-2 pb-2 mb-4 fw-semibold"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      <div className="abd-home d-flex align-items-center gap-2 text-muted">
        <IoHomeOutline size={20} />
        <div className="fs-4">Home</div>
        <MdArrowForwardIos size={14} />
      </div>
      <div style={{ color: "var(--orange-color-2)" }} className="fs-4">
        {path}
      </div>
    </div>
  );
}

export default PagePath;
