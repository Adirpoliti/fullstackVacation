import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../../index.css";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  height: "100vh",
});

const AnotherMainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fafafa",
  height: "520px",
  width: "400px",
  borderRadius: "15px",
  // padding: "10px",
  boxSizing: "border-box"
});

const LoginTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "tripSans",
});

const LoginInput = styled(OutlinedInput)({
  width: "100%",
  height: "45px",
  fontFamily: "tripSans",
  marginBottom: "20px",
});

const InputTitle = styled(InputLabel)({
  color: "black",
  fontWeight: "600",
  fontSize: "15px",
  textAlign: "left",
  fontFamily: "tripSans",
});

const LoginBtn = styled(Button)({
  backgroundColor: "black",
  color: "white",
  fontFamily: "tripSans",
  fontWeight: "600",
  fontSize: "15px",
  textAlign: "center",
  width: "100%",
  height: "45px",
  marginBottom: "30px",
  "&:hover": {
    color: "black",
  },
});

const StyledDivider = styled(Divider)({
  width: "100%",
  marginBottom: "5px",
});

const RegisterLink = styled(Typography)({
  color: "black",
  textDecoration: "none",
  cursor: "pointer",
  fontFamily: "tripSans",
  "&:hover": {
    textDecoration: "underline",
  },
});

const imgStyle = {
  width: "120px",
  height: "109px",
};

interface LoginProp {
  onClick: () => void;
}

export const LoginPage = ({ onClick }: LoginProp) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello");
  };

  return (
    <>
      <MainContainer>
        <AnotherMainContainer>
          <Box style={{ marginBottom: "20px" }}>
            <img alt="logo" style={imgStyle} src="/Assets/Images/logo.png" />
            <LoginTitle>Login</LoginTitle>
          </Box>
          <form onSubmit={(e) => handleLoginForm(e)}>
            <Box>
              <InputTitle>Email</InputTitle>
              <LoginInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
              />
            </Box>
            <Box>
              <InputTitle>Password</InputTitle>
              <LoginInput
                type={showPassword ? "text" : "password"}
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            <LoginBtn type="submit">Login</LoginBtn>
          </form>
          <Box>
            <StyledDivider>Not a member?</StyledDivider>
            <RegisterLink onClick={onClick}>
              <span style={{ fontWeight: "bold" }}>Join</span> to unlock the
              best of PRTVacations
            </RegisterLink>
          </Box>
        </AnotherMainContainer>
      </MainContainer>
    </>
  );
};
