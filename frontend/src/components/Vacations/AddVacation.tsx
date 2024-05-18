import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import { date, number, object, string, ref } from "yup";
import { useForm, Controller } from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../../index.css";
import { VacationPostType } from "../../types/VacationType";
import { addNewVacationService } from "../../services/vacationServices/addNewVacation";
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";
import { Navigate } from "react-router-dom";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  height: "100%",
  paddingTop: "150px",
});

const AnotherMainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#292929",
  height: "830px",
  width: "400px",
  borderRadius: "15px",
  padding: "40px",
  boxSizing: "border-box",
  margin: "50px",
});

const AddVacTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "tripSans",
  color: "white",
});

const VacationInput = styled(OutlinedInput)({
  width: "100%",
  height: "45px",
  fontFamily: "tripSans",
  marginBottom: "20px",
  backgroundColor: "#f5f5f5",
});

const VacationDescInput = styled(OutlinedInput)({
  width: "100%",
  fontFamily: "tripSans",
  marginBottom: "20px",
  backgroundColor: "#f5f5f5",
});

const InputTitle = styled(InputLabel)({
  color: "white",
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
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
});

const AddedVacationText = styled(Typography)({
  color: "green",
  fontFamily: "tripSans",
  fontSize: "18px",
  textAlign: "center",
});

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

const FileBtn = styled(Button)({
  marginBottom: "20px",
  border: "1px solid #c0c0c0",
  color: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "#fafafa",
  },
}) as typeof Button;

export const AddVacation = () => {
  const user = useAppSelector(selectUser);
  const { register, handleSubmit, control, reset, watch } = useForm<VacationPostType>();
  const [isVacationAdded, setIsVacationAdded] = useState<boolean>(false);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const startDate = watch("startDate");

  const newVacationSchema = object({
    locationCountry: string().required().min(2),
    locationCity: string().required().min(2),
    description: string().required().min(2),
    startDate: date()
      .required("Start date is required")
      .min(new Date(), "Start date cannot be before today"),
    endDate: date()
      .required("End date is required")
      .min(ref("startDate"), "End date cannot be before start date"),
    price: number().required().positive().integer().max(10000),
  });

  const handleNewVacation = async (newVacation: VacationPostType) => {
    try {
      await newVacationSchema.validate(newVacation, { abortEarly: false });
      const betterVacation = {
        locationCountry: newVacation.locationCountry,
        locationCity: newVacation.locationCity,
        description: newVacation.description,
        startDate: newVacation.startDate,
        endDate: newVacation.endDate,
        price: newVacation.price,
        imageFile: newVacation.imageFile[0],
      };
      await addNewVacationService(betterVacation, user.token);
      setIsVacationAdded(!isVacationAdded);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MainContainer>
        {user.registeredUser.role === "admin" ? (
          <AnotherMainContainer>
            <Box style={{ marginBottom: "20px" }}>
              <AddVacTitle>Add New Vacation</AddVacTitle>
            </Box>
            <form onSubmit={handleSubmit(handleNewVacation)}>
              <Box>
                <InputTitle>Destination Country</InputTitle>
                <VacationInput
                  {...register("locationCountry", { required: true })}
                />
              </Box>
              <Box>
                <InputTitle>Destination City</InputTitle>
                <VacationInput
                  {...register("locationCity", { required: true })}
                />
              </Box>
              <Box>
                <InputTitle>Description</InputTitle>
                <VacationDescInput
                  multiline
                  rows={3}
                  {...register("description", { required: true })}
                />
              </Box>
              <Box>
                <InputTitle>Start on</InputTitle>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <VacationInput
                      type="date"
                      inputProps={{ min: getMinDate() }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <InputTitle>End on</InputTitle>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <VacationInput
                      type="date"
                      inputProps={{ min: startDate || getMinDate() }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <InputTitle>Price</InputTitle>
                <VacationInput
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon sx={{ color: "#292929" }} />
                    </InputAdornment>
                  }
                  {...register("price", { required: true })}
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
                  <VisuallyHiddenInput
                    type="file"
                    {...register("imageFile", { required: true })}
                  />
                </FileBtn>
              </Box>
              <VacationBtn type="submit">Add Vacation</VacationBtn>
            </form>
            {isVacationAdded && (
              <AddedVacationText>
                Vacation was added successfully! ☺
              </AddedVacationText>
            )}
          </AnotherMainContainer>
        ) : (
          <Navigate to="/" />
        )}
      </MainContainer>
    </>
  );
};
