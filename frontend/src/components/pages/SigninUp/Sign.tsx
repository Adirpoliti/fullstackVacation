import React, { useState } from "react";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const Sign = () => {
  // const [currentForm, setCurrentForm] = useState<string>("login");
  const [abc, setAbc] = useState<boolean>(true);

  const handleCard = () => {
    setAbc(!abc);
    console.log(abc);
  };

  return abc === true ? (
    <LoginPage onClick={handleCard} />
  ) : (
    <RegisterPage onClick={handleCard} />
  );
};
