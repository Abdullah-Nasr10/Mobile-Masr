import "./BrandBanner.css";
import { NavLink } from "react-router-dom";

function BrandBanners() {
  return (
    <div className="mos-brand-banners container my-5">
      <div className="mos-banner-grid">

        <NavLink to="/category/mobile?brands=Apple">
          <img src="/Images/AppleBanner.webp" alt="Apple Banner" />
        </NavLink>
        <NavLink to="/category/mobile?brands=Samsung">
          <img src="/Images/Samsungbanner.webp" alt="Samsung Banner" />
        </NavLink>
        <NavLink to="/category/mobile?brands=Xiaomi">
          <img src="/Images/Xioamibanner.webp" alt="Xiaomi Banner" />
        </NavLink>
        <NavLink to="/category/mobile?brands=Oppo">
          <img src="/Images/oppobanner.webp" alt="Oppo Banner" />
        </NavLink>

      </div>
    </div>
  );
}

export default BrandBanners;
