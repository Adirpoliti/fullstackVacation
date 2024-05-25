import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, styled, Pagination, Button } from "@mui/material";
import { getAllVacationsService } from "../services/vacationServices/getVacations";
import { VacationType } from "../types/VacationType";
import { useAppSelector } from "../App/hooks";
import { selectUser } from "../App/features/usersSlice";
import { VacationCard } from "./Vacations/VacationCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  activeVacationService,
  inactiveVacationService,
  followedVacationService,
} from "../services/vacationServices/filterVacationService";
import { Toaster } from "react-hot-toast";

const HomeBox = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingTop: "200px",
});

const CardsBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  boxSizing: "border-box",
  justifyContent: "center",
});

const FilterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  boxSizing: "border-box",
});

const PaginationBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const StyledPagination = styled(Pagination)({
  margin: "10px",
  "& .MuiPaginationItem-page": {
    color: "white",
    border: "1px solid #292929",
  },
  "& .MuiPaginationItem-previousNext": {
    color: "#c0c0c0",
    border: "none",
  },
  "& .Mui-selected": {
    backgroundColor: "#c0c0c0 !important",
    color: "#191919",
  },
});

export const HomePage = () => {
  const [vacations, setVacations] = useState<VacationType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(selectUser);

  const vacationsPerPage = 10;
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const getAllVacations = async (): Promise<void> => {
    try {
      if (user?.token) {
        const AllVacations = await getAllVacationsService(user.token);
        setVacations(AllVacations);
      }
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllVacations();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFilterVacations = async (filterType: string) => {
    try {
      let filteredVacations = [];
      if (user?.token) {
        if (filterType === "active") {
          filteredVacations = await activeVacationService(user?.token);
        } else if (filterType === "inactive") {
          filteredVacations = await inactiveVacationService(user?.token);
        } else if (filterType === "followed") {
          filteredVacations = await followedVacationService(user?.token);
          console.log(user);
        } else if (filterType === "all") {
          filteredVacations = await getAllVacationsService(user?.token);
        }
        setVacations(filteredVacations);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <HomeBox>
      <Toaster position="top-center" reverseOrder={true} />
      <FilterBox>
        <FilterAltIcon sx={{ fontSize: "20px", color: "white" }} />
        <Typography
          sx={{ textAlign: "center", color: "white", fontFamily: "tripSans" }}
        >
          Filter Vacations:
        </Typography>
        <Button onClick={() => handleFilterVacations("all")}>Show All</Button>
        <Button onClick={() => handleFilterVacations("active")}>Active</Button>
        <Button onClick={() => handleFilterVacations("inactive")}>
          Inactive
        </Button>
        <Button onClick={() => handleFilterVacations("followed")}>
          Followed
        </Button>
      </FilterBox>
      <CardsBox>
        {user?.token ? (
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
              isFollowed={user.registeredUser.vacationsFollowed.includes(v._id)}
              refresh={getAllVacations}
            />
          ))
        ) : (
          <Navigate to="/" />
        )}
      </CardsBox>
      <PaginationBox>
        <StyledPagination
          count={Math.ceil(vacations.length / vacationsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
        />
      </PaginationBox>
    </HomeBox>
  );
};
