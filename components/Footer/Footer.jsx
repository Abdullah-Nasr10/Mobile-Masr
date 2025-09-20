import "./Footer.css";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mos-footer bg-light pt-5">
      <div className="container">
        <div className="row">
          
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">WHO ARE WE</h6>
            <ul className="list-unstyled">
              <li><a href="#">About MobileMasr</a></li>
              <li><a href="#">MobileMasr Diagnostic Technology</a></li>
              <li><a href="#">Insurance on Used Mobiles</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Jobs</a></li>
            </ul>
          </div>

        
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">WARRANTIES & RETURN POLICY</h6>
            <ul className="list-unstyled">
              <li><a href="#">Warranties & Return Policy</a></li>
              <li><a href="#">Used Devices Warranty</a></li>
              <li><a href="#">New Devices Warranty</a></li>
              <li><a href="#">Order Cancellation Policy</a></li>
              <li><a href="#">Product Return & Refund Policy</a></li>
            </ul>
          </div>

       
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">PAYMENT AND INSTALLMENT OPTIONS</h6>
            <ul className="list-unstyled">
              <li><a href="#">Pay in Installments with ValU</a></li>
              <li><a href="#">Pay in Installments with AMAN</a></li>
              <li><a href="#">Pay in Installments with Souhoola</a></li>
              <li><a href="#">Pay in Installments with Contact</a></li>
              <li><a href="#">Pay in Installments with Forsa</a></li>
              <li><a href="#">Pay in Installments with Halan</a></li>
              <li><a href="#">Pay in Installments with Mogo</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">SELL WITH US</h6>
            <ul className="list-unstyled">
              <li><a href="#">Become and Authorized Vendor</a></li>
            </ul>
          </div>

        
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">USEFUL LINKS</h6>
            <ul className="list-unstyled">
              <li><a href="#">Guide</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">New iPhones</a></li>
              <li><a href="#">Used iPhones</a></li>
              <li><a href="#">Used Android phones</a></li>
              <li><a href="#">New Smartwatches</a></li>
              <li><a href="#">Used Smartwatches</a></li>
            </ul>
          </div>

       
          <div className="col-md-1 mb-4">
            <h6 className="fw-bold">MOBILE APP</h6>
            <div className="d-flex flex-column gap-2">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                style={{ width: "11rem", cursor:"pointer" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                style={{ width: "11rem", cursor:"pointer" }}
              />
            </div>
          </div>
        </div>

      
<div className="col mt-4">
  <div className="d-flex align-items-center mb-3 gap-4">
    <h6 className="fw-bold mb-0">SIGN UP & GET OFFERS AND UPDATES</h6>
    <div className="d-flex">
      <input type="email" className="form-control p-3" />
      <button className="btn btn-dark">→</button>
    </div>
  </div>
  <div className="d-flex mt-3 mos-social-icons">
    <a href="#" className="me-4"><FaFacebookF size="2.5rem" /></a>
    <a href="#" className="me-4"><FaWhatsapp size="2.5rem" /></a>
    <a href="#"><FaInstagram size="2.5rem" /></a>
  </div>

</div>


      </div>
        
        <div className=" text center mt-5 text-muted bg-white p-4">
          ©2025 MobiTech Integrated Solutions. All Rights Reserved
        </div>
      
    </footer>
  );
}

export default Footer;
