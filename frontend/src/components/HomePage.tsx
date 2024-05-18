import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { getAllVacationsService } from "../services/vacationServices/getVacations";
import { VacationType } from "../types/VacationType";
import { useAppSelector } from "../App/hooks";
import { selectUser } from "../App/features/usersSlice";
import { VacationCard } from "./Vacations/VacationCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const HomeBox = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: "150px",
});

const CardsBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  padding: "20px",
  width: "100%",
  boxSizing: "border-box",
  gap: "10px",
  justifyContent: "center",
});

const FilterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  boxSizing: "border-box",
});

export const HomePage = () => {
  const [vacations, setVacations] = useState<VacationType[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const getAllVacations = async () => {
      try {
        const AllVacations = await getAllVacationsService(user.token);
        setVacations(AllVacations);
      } catch {
        console.log("error");
      }
    };

    getAllVacations();
  }, [user.token]);

  return (
    <HomeBox>
      <FilterBox>
        <Typography
          sx={{ textAlign: "center", color: "white", fontFamily: "tripSans" }}
        >
          <FilterAltIcon
            sx={{ fontSize: "20px", color: "white", marginRight: "10px" }}
          />
          Filter Vacations
        </Typography>
      </FilterBox>
      <CardsBox>
        {user.token ? (
          vacations.map((v, i) => (
            <VacationCard
              key={i}
              _id={v._id}
              locationCountry={v.locationCountry}
              locationCity={v.locationCity}
              description={v.description}
              startDate={v.startDate}
              endDate={v.endDate}
              price={v.price}
              imageName={v.imageName}
              usersFollowed={v.usersFollowed}
            />
          ))
        ) : (
          <Navigate to="/" />
        )}
      </CardsBox>
    </HomeBox>
  );
};
