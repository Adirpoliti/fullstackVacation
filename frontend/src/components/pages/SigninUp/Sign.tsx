import React, { useState } from "react";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const Sign = () => {
  const [toggleForm, setToggleForm] = useState<boolean>(true);

  const handleCard = () => {
    setToggleForm(!toggleForm);
  };

  return toggleForm === true ? (
    <LoginPage onClick={handleCard} />
  ) : (
    <RegisterPage onClick={handleCard} />
  );
};
