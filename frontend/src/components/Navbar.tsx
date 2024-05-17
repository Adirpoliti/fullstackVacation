import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, styled } from "@mui/material";
import { clearUser, selectUser } from "../App/features/usersSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "40px",
  position: "fixed",
  top: "0px",
  width: "100%",
  zIndex: 1000,
  backgroundColor: "#191919",
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
    console.log("logged out");
  };

  return (
    user.token ? (
      <NavbarContainer>
        <StyledLink onClick={() => navigate("/home")}>All Vacations</StyledLink>
        {user.registeredUser.role === "admin" && (
          <StyledLink onClick={() => navigate("/newvacation")} href="">
            New Vacation
          </StyledLink>
        )}
        <img src="/Assets/Images/Untitled-2.jpg" alt="logo" height={150} />
        {user.registeredUser.role === "admin" && (
          <StyledLink onClick={() => navigate("/vacationchart")}>
            Vacations Report
          </StyledLink>
        )}
        <StyledLink onClick={handleLogout}>Logout</StyledLink>
      </NavbarContainer>
    ) : null
  )
};