import "./Loader.css";
function Loader() {
  return (
    // <div className="loader-wrapper d-flex justify-content-center align-items-center">
    //   <div className="spinner-border text-primary" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>

    <div className="cssload-container">
      <ul className="cssload-flex-container">
        <li>
          <span className="cssload-loading cssload-one"></span>
          <span className="cssload-loading cssload-two"></span>
          <span className="cssload-loading-center"></span>
        </li>
      </ul>
    </div>
  );
}

export default Loader;
