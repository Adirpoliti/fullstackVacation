import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
// import { useForm } from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../../../index.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  height: "750px",
  width: "400px",
  borderRadius: "15px",
  padding: "40px",
  boxSizing: "border-box",
});

const AddVacTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "tripSans",
});

const VacationInput = styled(OutlinedInput)({
  width: "100%",
  height: "45px",
  fontFamily: "tripSans",
  marginBottom: "20px",
});

const VacationDescInput = styled(OutlinedInput)({
  width: "100%",
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

const VacationBtn = styled(Button)({
  backgroundColor: "black",
  color: "white",
  fontFamily: "tripSans",
  fontWeight: "600",
  fontSize: "15px",
  textAlign: "center",
  width: "100%",
  height: "45px",
  //   marginBottom: "30px",
  "&:hover": {
    color: "black",
    border: "1px solid black",
  },
});

const FileBtn = styled(Button)({
    marginBottom: "20px",
    border: "1px solid #c0c0c0",
    color: "black",
    "&:hover": {
        color: "black",
        border: "1px solid black",
        backgroundColor: "#fafafa",
    }
}) as typeof Button;

export const AddVacation = () => {
  //   const { register, handleSubmit, reset } =
  //     useForm<UserRegisterCredentialsType>();

  return (
    <>
      <MainContainer>
        <AnotherMainContainer>
          <Box style={{ marginBottom: "20px" }}>
            <AddVacTitle>Add New Vacation</AddVacTitle>
          </Box>
          <form
            onSubmit={() => {
              console.log("hello world");
            }}
          >
            <Box>
              <InputTitle>Destination</InputTitle>
              <VacationInput
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                // {...register("destination", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Description</InputTitle>

              <VacationDescInput
                multiline
                rows={3}
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                // {...register("description", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Start on</InputTitle>
              <VacationInput
                type="date"
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                // {...register("email", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>End on</InputTitle>
              <VacationInput
                type="date"
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                // {...register("email", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Price</InputTitle>
              <VacationInput
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                }
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 1000px #fafafa inset" },
                }}
                // {...register("email", { required: true })}
              />
            </Box>
            <Box>
              <InputTitle>Cover image</InputTitle>
              <FileBtn
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Picture
                <VisuallyHiddenInput type="file" />
              </FileBtn>
            </Box>
            <VacationBtn type="submit">Add Vacation</VacationBtn>
          </form>
        </AnotherMainContainer>
      </MainContainer>
    </>
  );
};
