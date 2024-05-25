import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, styled } from "@mui/material";
import { selectUser } from "../App/features/usersSlice";
import { useAppSelector } from "../App/hooks";
import LogoutMenu from "./LogoutMenu";
import { useRefresh } from "../components/RefreshContext";

const NavbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "10px",
  position: "fixed",
  top: "0px",
  width: "100%",
  zIndex: 1000,
  backgroundColor: "#191919",
});

const StyledNavbarBtn = styled(Button)({
  textTransform: "none",
  color: "white",
  fontFamily: "tripSans",
  fontSize: "16px",
  "&:hover": {
    fontWeight: "bold",
    backgroundColor: "#191919",
  },
});

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { toggleRefreshTrigger } = useRefresh();

  return user.token ? (
    <NavbarContainer>
      <StyledNavbarBtn onClick={() => {
        navigate("/home", { replace: true });
        toggleRefreshTrigger();
      }}>All Vacations</StyledNavbarBtn>
      {user.registeredUser.role === "admin" && (
        <StyledNavbarBtn onClick={() => navigate("/newvacation")} href="">
          New Vacation
        </StyledNavbarBtn>
      )}
      <img
        src="/Assets/Images/Untitled-2.jpg"
        alt="logo"
        height={150}
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      />
      {user.registeredUser.role === "admin" && (
        <StyledNavbarBtn onClick={() => navigate("/vacationchart")}>
          Vacations Report
        </StyledNavbarBtn>
      )}
      <LogoutMenu />
    </NavbarContainer>
  ) : null;
};
