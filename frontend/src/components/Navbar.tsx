import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, styled } from "@mui/material";
import { clearUser } from "../App/features/usersSlice";
import { useAppDispatch } from "../App/hooks";

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "40px",
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "#333",
  zIndex: 1000,
  padding: "10px 0",
  margin: "1px"
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
  const dispatch = useAppDispatch()

  const handleLogout = () => {
      dispatch(clearUser())
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
