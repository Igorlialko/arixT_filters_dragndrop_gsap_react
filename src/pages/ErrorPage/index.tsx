import React from "react";
import {useNavigate} from "react-router-dom";

import Button from "../../sharedComponents/Button";
import "./index.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error _container">
      <h1 className="error__title">
                404
      </h1>
      <Button onClick={() => navigate("/")} className="error__button">
                back to home
      </Button>
    </div>
  );
};

export default ErrorPage;