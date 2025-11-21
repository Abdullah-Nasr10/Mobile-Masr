import React from "react";
import "./Register.css";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import PagePath from "../../../components/GlobalComponents/PagePath/PagePath";

function Register() {
  return (
    <div className="container">
      <div className=" pt-5">
      <PagePath path={"Register"} />
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;
