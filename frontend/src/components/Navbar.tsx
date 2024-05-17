import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, styled } from "@mui/material";

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "40px",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    fontWeight: "bold",
  },
});


export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      navigate("/")
      console.log("logged out")
  }

  return (
    <NavbarContainer>
      <StyledLink onClick={() => navigate("/home")}>All Vacations</StyledLink>
      <StyledLink  onClick={() => navigate("/newvacation")} href="">New Vacation</StyledLink>
      <img src="/Assets/Images/Untitled-2.jpg" alt="logo" height={150} />
      <StyledLink onClick={() => navigate("/vacationchart")}>Vacations Report</StyledLink>
      <StyledLink onClick={handleLogout} >Logout</StyledLink>
    </NavbarContainer>
  );
};
