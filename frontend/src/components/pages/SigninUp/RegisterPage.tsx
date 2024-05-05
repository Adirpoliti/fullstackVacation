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
import { useForm } from "react-hook-form";
import { UserRegisterCredentialsType } from "../../../types/UserType";
import { object, string } from "yup";
import { registerService } from "../../../services/registerService";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  height: "100vh",
  width: "100vw",
});

const AnotherMainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fafafa",
  height: "670px",
  width: "400px",
  borderRadius: "15px",
  padding: "10px",
  overflow: "hidden",
});

const LoginTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "tripSans",
});

const LoginInput = styled(OutlinedInput)({
  width: "270px",
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
  marginBottom: "1px",
});

const LoginBtn = styled(Button)({
  backgroundColor: "black",
  color: "white",
  fontFamily: "tripSans",
  fontWeight: "600",
  fontSize: "15px",
  textAlign: "center",
  width: "270px",
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

export const RegisterPage = ({ onClick }: LoginProp) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register, handleSubmit, reset } =
    useForm<UserRegisterCredentialsType>();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordRegexPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/;
  const emailRegexPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  let userRegistrationScheme = object({
    firstName: string().required().min(2).max(12),
    lastName: string().required().min(2).max(20),
    email: string().required().min(12).max(254).matches(emailRegexPattern),
    password: string().required().min(8).max(32).matches(passwordRegexPattern),
  });

  const validateUser = (userCreds: UserRegisterCredentialsType) => {
    userRegistrationScheme.validate(userCreds).then(async () => {
      console.log(userCreds);
      await registerService(userCreds);
    //   reset();
    });
  };

  //   const handleRegisterForm = (userCreds: UserRegisterCredentialsType) => {
  //     console.log(userCreds);
  //   };

  return (
    <>
      <MainContainer>
        <AnotherMainContainer>
          <Box style={{ marginBottom: "20px" }}>
            <img alt="logo" style={imgStyle} src="/Assets/Images/logo.png" />
            <LoginTitle>Register</LoginTitle>
          </Box>
          <form onSubmit={handleSubmit(validateUser)}>
            <Box>
              <InputTitle>First Name</InputTitle>
              <LoginInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                }}
                {...register("firstName", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Last Name</InputTitle>
              <LoginInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                }}
                {...register("lastName", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Email</InputTitle>
              <LoginInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                }}
                {...register("email", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Password</InputTitle>
              <LoginInput
                type={showPassword ? "text" : "password"}
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                }}
                {...register("password", { required: true })}
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
            <LoginBtn type="submit">Register</LoginBtn>
          </form>
          <Box>
            <StyledDivider>Already a memeber?</StyledDivider>
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
