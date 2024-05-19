import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, styled, Pagination } from "@mui/material";
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
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(selectUser);

  const vacationsPerPage = 10;
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);
  const getAllVacations = async () => {
    try {
      const AllVacations = await getAllVacationsService(user.token);
      setVacations(AllVacations);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
 

    getAllVacations();
  },[user.token]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

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
          currentVacations.map((v, i) => (
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
              refresh={getAllVacations}
            />
          ))
        ) : (
          <Navigate to="/" />
        )}
      </CardsBox>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(vacations.length / vacationsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
        />
      </Box>
    </HomeBox>
  );
};
