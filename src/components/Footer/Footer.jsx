import "./Footer.css";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mos-footer bg-light pt-5 mt-5">
      <div className="container">
        <div className="row g-4">
          
          <div className="col-12 col-sm-6 col-lg-2 mb-4">
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

          <div className="col-12 col-sm-6 col-lg-2 mb-4">
            <h6 className="fw-bold">WARRANTIES & RETURN POLICY</h6>
            <ul className="list-unstyled">
              <li><a href="#">Warranties & Return Policy</a></li>
              <li><a href="#">Used Devices Warranty</a></li>
              <li><a href="#">New Devices Warranty</a></li>
              <li><a href="#">Order Cancellation Policy</a></li>
              <li><a href="#">Product Return & Refund Policy</a></li>
            </ul>
          </div>

       
          <div className="col-12 col-sm-6 col-lg-2 mb-4">
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

          <div className="col-12 col-sm-6 col-lg-2 mb-4">
            <h6 className="fw-bold">SELL WITH US</h6>
            <ul className="list-unstyled">
              <li><a href="#">Become and Authorized Vendor</a></li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-2 mb-4">
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

       <div className="col-12 col-sm-6 col-lg-2 mb-4">
        <h6 className="fw-bold">BUYING & SELLING</h6>
            <ul className="list-unstyled">
              <li><a href="#">How to buy from a private seller</a></li>
              <li><a href="#">Steps to post an ad on the application</a></li>
            </ul>
            
              <h6 className="fw-bold mt-4">MOBILE APP</h6>
            <div className="d-flex flex-column gap-2 mos-app-badges">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                className="mos-app-badge"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                className="mos-app-badge"
              />
            </div>

       </div>
        </div>

      
        <div className="row mt-2">
          <div className="col-12">
              <div className="row align-items-center g-3">
                <div className="col-12 col-md-4">
                  <h6 className="fw-bold mb-0">SIGN UP & GET OFFERS AND UPDATES</h6>
                </div>
                <div className="col-12 col-md-7">
                  <div className="input-group">
                    <input type="email" className="form-control" />
                    <button className="btn btn-dark">→</button>
                  </div>
                </div>
              </div>
              <div className="mos-social-icons mt-3">
                <a href="#" className="me-3 me-md-4"><FaFacebookF className="mos-social-icon" /></a>
                <a href="#" className="me-3 me-md-4"><FaWhatsapp className="mos-social-icon" /></a>
                <a href="#"><FaInstagram className="mos-social-icon" /></a>
           
            </div>
          </div>
        </div>
      </div>
        
      <div className="text-center mt-5 text-muted bg-white p-3 p-md-4 mos-copyright">
        ©2025 MobiTech Integrated Solutions. All Rights Reserved For hgRAM
      </div>
    </footer>
  );
}

export default Footer;
