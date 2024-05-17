import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import { date, number, object, ref, string } from "yup";
import { useForm } from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../../index.css";
import { VacationPostType, VacationType } from "../../types/VacationType";
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getOneVacationService } from "../../services/vacationServices/getOneVacation";
import { editVacationService } from "../../services/vacationServices/editVacation";

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
  height: "950px",
  width: "400px",
  borderRadius: "15px",
  padding: "40px",
  boxSizing: "border-box",
  margin: "50px",
});

const EditVacTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "tripSans",
  color: "white",
});

const EditVacationInput = styled(OutlinedInput)({
  width: "100%",
  height: "45px",
  fontFamily: "tripSans",
  marginBottom: "20px",
  backgroundColor: "#f5f5f5",
});

const EditVacationDescInput = styled(OutlinedInput)({
  width: "100%",
  fontFamily: "tripSans",
  marginBottom: "20px",
  backgroundColor: "#f5f5f5",
});

const EditInputTitle = styled(InputLabel)({
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
  textAlign: "left",
  fontFamily: "tripSans",
  marginBottom: "1px",
});

const EditVacationBtn = styled(Button)({
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

const ImgBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  boxSizing: "border-box",
  margin: "10px",
});

export const EditVacation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [editedVacationState, setEditedVacationState] =
    useState<VacationType>();
  const user = useAppSelector(selectUser);
  const { register, handleSubmit, reset } = useForm<VacationPostType>();

  const getMinDate = () => {
    return new Date();
  };

  let newVacationScheme = object({
    locationCountry: string().required().min(2),
    locationCity: string().required().min(2),
    description: string().required().min(2),
    startDate: date().required().min(getMinDate()).max(ref("endDate")),
    endDate: date().required().min(getMinDate()),
    price: number().required().positive().integer().max(10000),
  });

  const handleEditedVacation = async (editedVacation: VacationPostType) => {
    try {
      newVacationScheme.validate(editedVacation);
      const betterVacation = {
        _id: id,
        locationCountry: editedVacation.locationCountry,
        locationCity: editedVacation.locationCity,
        description: editedVacation.description,
        startDate: editedVacation.startDate,
        endDate: editedVacation.endDate,
        price: editedVacation.price,
        imageFile: editedVacation.imageFile[0],
      };
      await editVacationService(betterVacation, user.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchVacation = async () => {
      try {
        const vacation = await getOneVacationService(id, user.token);
        setEditedVacationState(vacation);
        reset({
          locationCity: vacation.locationCity,
          locationCountry: vacation.locationCountry,
          description: vacation.description,
          startDate: vacation.startDate.substring(0, 10).split("-").join("-"),
          endDate: vacation.endDate.substring(0, 10).split("-").join("-"),
          price: vacation.price,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchVacation();
  }, [user.token, id, reset]);

  return (
    <>
      <MainContainer>
        <AnotherMainContainer>
          <Box style={{ marginBottom: "20px" }}>
            <EditVacTitle>Edit Vacation</EditVacTitle>
          </Box>
          <form onSubmit={handleSubmit(handleEditedVacation)}>
            <Box>
              <EditInputTitle>Destination Country</EditInputTitle>
              <EditVacationInput
                {...register("locationCountry", { required: true })}
              />
            </Box>
            <Box>
              <EditInputTitle>Destination City</EditInputTitle>
              <EditVacationInput
                {...register("locationCity", { required: true })}
              />
            </Box>
            <Box>
              <EditInputTitle>Description</EditInputTitle>
              <EditVacationDescInput
                multiline
                rows={3}
                {...register("description", { required: true })}
              />
            </Box>
            <Box>
              <EditInputTitle>Start on</EditInputTitle>
              <EditVacationInput
                type="date"
                {...register("startDate", { required: true })}
              />
            </Box>
            <Box>
              <EditInputTitle>End on</EditInputTitle>
              <EditVacationInput
                type="date"
                {...register("endDate", { required: true })}
              />
            </Box>
            <Box>
              <EditInputTitle>Price</EditInputTitle>
              <EditVacationInput
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
              <EditInputTitle>Cover image</EditInputTitle>
              <ImgBox>
                <img
                  width={250}
                  alt="country"
                  src={`http://localhost:3001/images/${editedVacationState?.imageName}`}
                />
              </ImgBox>
              <FileBtn
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Picture
                <VisuallyHiddenInput
                  type="file"
                  {...register("imageFile", { required: false })}
                />
              </FileBtn>
            </Box>
            <EditVacationBtn type="submit">Save Vacation</EditVacationBtn>
          </form>
        </AnotherMainContainer>
      </MainContainer>
    </>
  );
};
