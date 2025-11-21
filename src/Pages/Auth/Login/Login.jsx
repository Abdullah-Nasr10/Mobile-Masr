import React from "react";
import LoginForm from "../../../components/LoginForm/LoginForm";
import PagePath from "../../../components/GlobalComponents/PagePath/PagePath";

const Login = () => {
  return (
    <div className="container">
      <div className=" pt-5">
        <PagePath path={"Login"} />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
