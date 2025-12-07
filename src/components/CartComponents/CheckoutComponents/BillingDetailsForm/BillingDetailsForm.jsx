import React, { useState } from "react";
import "./BillingDetailsForm.css";
import { useForm } from "react-hook-form";
import { billingValidationRules } from "../../../../utilities/validationSchemas";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";

function BillingDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // If payment method is online (Stripe)
      if (data.paymentMethod === "online") {
        const res = await fetch(
          "http://localhost:3000/stripe/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              shippingAddress: {
                fullName: data.fullName,
                phone: data.phone,
                governorate: data.governorate,
                city: data.city,
                street: data.street,
                notes: data.notes || "",
              },
            }),
          }
        );

        const result = await res.json();

        if (result.url) {
          window.location.href = result.url; // Redirect to Stripe Checkout
        } else {
          alert("Failed to create payment session");
          setIsSubmitting(false);
        }
      } else {
        // Cash on delivery
        const orderData = {
          fullName: data.fullName,
          phone: data.phone,
          governorate: data.governorate,
          city: data.city,
          street: data.street,
          notes: data.notes || "",
          paymentMethod: data.paymentMethod,
        };

        const resultAction = await dispatch(createOrder(orderData));

        if (createOrder.fulfilled.match(resultAction)) {
          navigate("/cart/order-success");
        } else {
          alert("Failed to create order");
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while processing your order");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="abd-checkout-form p-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-4">Billing Details</h3>

      {/* ========================Full Name======================= */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
          id="fullName"
          {...register("fullName", billingValidationRules.fullName)}
        />
        {errors.fullName && (
          <div className="text-danger mt-1">{errors.fullName?.message}</div>
        )}
      </div>

      {/* ========================Phone======================= */}
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          id="phone"
          {...register("phone", billingValidationRules.phone)}
        />
        {errors.phone && (
          <div className="text-danger mt-1">{errors.phone?.message}</div>
        )}
      </div>

      {/* ========================Governorate======================= */}
      <div className="mb-3">
        <label htmlFor="governorate" className="form-label">
          Governorate
        </label>
        <input
          type="text"
          className={`form-control ${errors.governorate ? "is-invalid" : ""}`}
          id="governorate"
          {...register("governorate", billingValidationRules.governorate)}
        />
        {errors.governorate && (
          <div className="text-danger mt-1">{errors.governorate?.message}</div>
        )}
      </div>

      {/* ========================City======================= */}
      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className={`form-control ${errors.city ? "is-invalid" : ""}`}
          id="city"
          {...register("city", billingValidationRules.city)}
        />
        {errors.city && (
          <div className="text-danger mt-1">{errors.city?.message}</div>
        )}
      </div>

      {/* ========================Street======================= */}
      <div className="mb-3">
        <label htmlFor="street" className="form-label">
          Street
        </label>
        <input
          type="text"
          className={`form-control ${errors.street ? "is-invalid" : ""}`}
          id="street"
          {...register("street", billingValidationRules.street)}
        />
        {errors.street && (
          <div className="text-danger mt-1">{errors.street?.message}</div>
        )}
      </div>

      {/* ========================Notes======================= */}
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Notes (optional)
        </label>
        <textarea
          className={`form-control ${errors.notes ? "is-invalid" : ""}`}
          id="notes"
          {...register("notes", billingValidationRules.notes)}
        />
        {errors.notes && (
          <div className="text-danger mt-1">{errors.notes?.message}</div>
        )}
      </div>
      {/* ====================choose payment method==================== */}
      <div className="mb-4">
        <label className="form-label d-block mb-2">Payment Method</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="paymentCash"
            value="cod"
            {...register("paymentMethod", {
              required: "Payment method is required",
            })}
          />
          <label className="form-check-label" htmlFor="paymentCash">
            Cash on delivery
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="paymentOnline"
            value="online"
            {...register("paymentMethod", {
              required: "Payment method is required",
            })}
          />
          <label className="form-check-label" htmlFor="paymentOnline">
            Card payment
          </label>
        </div>
        {errors.paymentMethod && (
          <div className="text-danger mt-2">
            {errors.paymentMethod?.message}
          </div>
        )}
      </div>

      {/* ========================Submit Button======================= */}
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}

export default BillingDetailsForm;
