import React from "react";
import { Modal, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "./AddReview.css";

function ReviewModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate and review</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ minHeight: "120px" }}>
          {/* Design space — حط أي عناصر هنا */}
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="success">Add Review</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
