

export default function MobileReviewsStatic() {
  const Card = ({ title, text, rating }) => {
    return (
      <div
        className="p-4 border rounded-4 shadow-sm"
        style={{
          backgroundColor: "#fff7ef",
          borderColor: "#FF5100",
          width: "420px",
          height: "220px",
          transition: "0.3s",
        }}
      >
        <h5 className="fw-bold mb-2" style={{ color: "#FF5100", fontSize: "22px" }}>
          {title}
        </h5>

        <p className="text-dark" style={{ fontSize: "15.8px", lineHeight: "1.5" }}>
          {text}
        </p>

        <div className="mt-3 fs-4" style={{ color: "#ffc107" }}>
          {"⭐".repeat(rating)}
        </div>
      </div>
    );
  };

  return (
    <div
      className="d-flex justify-content-center gap-4 mt-5 flex-wrap"
      style={{
        width: "100%",
      }}
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
