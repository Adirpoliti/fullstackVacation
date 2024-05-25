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
import "../../index.css";
import { object, string } from "yup";
import { loginService } from "../../services/userServices/loginService";
import { UserLoginCredentialsType } from "../../types/UserType";
import { useForm } from "react-hook-form";
import { setUser } from "../../App/features/usersSlice";
import { useAppDispatch } from "../../App/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
  boxSizing: "border-box",
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
    border: "1px solid black",
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<UserLoginCredentialsType>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordRegexPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/;
  const emailRegexPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  let userLoginScheme = object({
    password: string().required().min(8).max(32).matches(passwordRegexPattern),
    email: string().required().min(12).max(254).matches(emailRegexPattern),
  });

  const validateUser = async (userCreds: UserLoginCredentialsType) => {
    userLoginScheme
      .validate(userCreds)
      .then(async () => {
        await loginService(userCreds)
          .then((res) => {
            dispatch(setUser(res.data));
            reset();
            const prettyName =
              res.data.registeredUser.firstName.charAt(0).toUpperCase() +
              res.data.registeredUser.firstName.substring(1);

            toast(`Welcome ${prettyName}`, {
              icon: "👋",
              style: {
                background: "#333",
                color: "#fff",
              },
            });
            navigate("/home");
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              style: {
                background: "#333",
                color: "#fff",
              },
            });
          });
      })
      .catch((err) => {
        toast.error(err.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  return (
    <>
      <MainContainer>
        <Toaster
          toastOptions={{ style: { zIndex: 2000 } }}
          position="top-center"
          reverseOrder={false}
        />
        <AnotherMainContainer>
          <Box style={{ marginBottom: "20px" }}>
            <img alt="logo" style={imgStyle} src="/Assets/Images/logo.png" />
            <LoginTitle>Login</LoginTitle>
          </Box>
          <form onSubmit={handleSubmit(validateUser)}>
            <Box>
              <InputTitle>Email</InputTitle>
              <LoginInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                {...register("email", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Password</InputTitle>
              <LoginInput
                type={showPassword ? "text" : "password"}
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
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
