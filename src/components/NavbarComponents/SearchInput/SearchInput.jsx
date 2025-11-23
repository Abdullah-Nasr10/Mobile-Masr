import React from "react";
import "./SearchInput.css";
function SearchInput() {
  return (
    <div className="d-inline-flex align-items-center abd-SearchBox">
      <input
        type="search"
        name="search"
        placeholder="What are You looking to day? "
        className="abd-NavInputSerach w-100 p-3"
      />
    </div>
  );
}

export default SearchInput;
