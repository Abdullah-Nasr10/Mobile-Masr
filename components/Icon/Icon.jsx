import React from 'react'

const Icon = () => {
  return (
    <div>
         <div
        className="container my-4 d-flex gap-3 p-3"
        style={{
          width: "1400px",
          minHeight: "30px",
          border: "2px solid #f5f2f2ff",
          backgroundColor: "#fff",
        }}
      >
        <div className="card p-2 flex-fill">
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/diagnostic_tool_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Diagnostic Tool Report
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Generate a diagnostic report for your device
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/secure_selling_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Guaranteed Sellers & Buyers
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Secure Platform for your info and cards
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/warranty_30_day_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                30 days warranty
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Buy with warranty from Verified Stores
              </p>
            </div>
          </div>
        </div>

        <div
          className="card p-2 flex-fill"
          style={{ borderLeft: "1px solid #fff" }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://mobilemasr.com/_ipx/_/Images/feature/fast_delivery_new.svg"
              alt="icon"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",

                padding: "3px",
              }}
            />
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                Fast Delivery
              </p>
              <p className="mb-0" style={{ fontSize: "11px" }}>
                Safe Delivery to All Governorates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Icon