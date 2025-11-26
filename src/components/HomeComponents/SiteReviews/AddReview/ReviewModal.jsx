import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function ReviewModal({ show, handleClose }) {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, review }),
    });

    alert("sent review successfully!");
    setRating(0);
    setReview("");
    handleClose();
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered
        dialogClassName="custom-modal"   
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Rate and review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <small className="text-muted" style={{ color: "#7c7c7c" }}>
            Rating ({rating}/5)
          </small>

          <div className="d-flex gap-2 my-2" style={{ fontSize: "30px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
                color={star <= rating ? "orange" : "#ccc"}
              />
            ))}
          </div>

          <Form>
            <Form.Label className="fw-semibold" style={{ color: "#7c7c7c" }}>
              Review
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              style={{
                border: "2px solid orange",
                borderRadius: "12px",
                padding: "10px",
                fontSize: "18px",
                resize: "none",
                height: "200px",
              }}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button
              variant="light"
              onClick={handleClose}
              style={{
                padding: "10px 25px",
                borderRadius: "15px",
                border: "1px solid #ccc",
                color: "#7c7c7c"
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              style={{
                padding: "10px 35px",
                borderRadius: "12px",
                backgroundColor: "var(--orange-color)",
                color: "white",
                border: "none",
              }}
            >
              Post
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

    
      <style>
      {`
        .custom-modal {
          max-width: 320px !important;
          width: 90% !important;
        }
      `}
      </style>
    </>
  );
}
