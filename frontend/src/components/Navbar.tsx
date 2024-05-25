import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, Typography, styled } from "@mui/material";
import { clearUser, selectUser } from "../App/features/usersSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  rowGap: "10px",
  position: "fixed",
  top: "0px",
  width: "100%",
  zIndex: 1000,
  backgroundColor: "#191919",
});

const NavbarStyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "40px",
})

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    fontWeight: "bold",
  },
});

const StyledGreeting = styled(Typography)({
  color: "white",
  fontFamily: "tripSans",
  fontSize: "23px",
  fontWeight: "bold",
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

  const getGreetingText = () => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 12
      ? "Good morning"
      : hour >= 12 && hour < 18
      ? "Good afternoon"
      : hour >= 18 && hour < 24
      ? "Good evening"
      : "Good night";
  };

  const Greeting = getGreetingText();

  const betterFirstName =
    user.registeredUser.firstName.charAt(0).toUpperCase() +
    user.registeredUser.firstName.substring(1).toLowerCase();
  const betterLastName =
    user.registeredUser.lastName.charAt(0).toUpperCase() +
    user.registeredUser.lastName.substring(1).toLowerCase();

  return user.token ? (
      <NavbarContainer>
        <NavbarStyledBox>
          <StyledLink onClick={() => navigate("/home")}>
            All Vacations
          </StyledLink>
          {user.registeredUser.role === "admin" && (
            <StyledLink onClick={() => navigate("/newvacation")} href="">
              New Vacation
            </StyledLink>
          )}
          <img
            src="/Assets/Images/Untitled-2.jpg"
            alt="logo"
            height={150}
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
          {user.registeredUser.role === "admin" && (
            <StyledLink onClick={() => navigate("/vacationchart")}>
              Vacations Report
            </StyledLink>
          )}
          <StyledLink onClick={handleLogout}>Logout</StyledLink>
        </NavbarStyledBox>
        <Box>
          <StyledGreeting>
            {Greeting}, {betterFirstName} {betterLastName}!
          </StyledGreeting>
        </Box>
      </NavbarContainer>
  ) : null;
};
