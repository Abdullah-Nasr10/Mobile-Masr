import { FaStar, FaUser } from "react-icons/fa";

export default function MobileReviewsStatic() {
  const Card = ({ title, text, rating }) => {
    return (
      <div
        className="position-relative p-4 rounded-4"
        style={{
          backgroundColor: "#fff7ef",
          border: "2px solid #FF5100",
          width: "430px",
          minHeight: "230px",
          borderRadius: "22px",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <div
          style={{
            position: "absolute",
            top: "-15px",
            left: "-15px",
            background: "#FF5100",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          “
        </div>

        <h5
          className="fw-bold mb-2"
          style={{
            fontSize: "21px",
            fontWeight: "700",
            color: "#ff5b00",
            letterSpacing: "0.3px",
            WebkitTextStroke: "0.3px #d94a00",
            textShadow: `
      0px 0px 2px rgba(255,85,0,0.35),
      0px 1px 1px rgba(180,60,0,0.6)
    `,
            marginLeft: "35px",
          }}
        >
          {title}
        </h5>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#4a4a4a",
            letterSpacing: "0.5px",
            marginTop: "8px",
          }}
        >
          {text}
        </p>

        <div
          className="mt-3"
          style={{ color: "#ffc107", display: "flex", gap: "4px" }}
        >
          {Array.from({ length: rating }).map((_, i) => (
            <FaStar key={i} size={22} />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "-18px",
            right: "-18px",
            background: "#fff",
            border: "3px solid #FF5100",
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <FaUser size={32} color="#FF5100" />
        </div>
      </div>
    );
  };

  return (
    <div
      className="d-flex justify-content-center flex-wrap gap-4 mt-5"
      style={{ width: "100%" }}
    >
      <Card
        title="Mobile Masr Reviews"
        text="Real user ratings and feedback from customers across Egypt to help you choose the best mobile at the best price."
        rating={5}
      />
      <Card
        title="Real User Reviews"
        text="Real user reviews from Egypt to help you choose the right mobile confidently."
        rating={4}
      />
      <Card
        title="Trusted Mobile Guide"
        text="Compare mobiles, check price updates, and find real experience before buying."
        rating={5}
      />
    </div>
  );
}
