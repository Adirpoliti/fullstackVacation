import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, styled, Pagination } from "@mui/material";
import { getAllVacationsService } from "../services/vacationServices/getVacations";
import { VacationType } from "../types/VacationType";
import { useAppSelector } from "../App/hooks";
import { selectUser } from "../App/features/usersSlice";
import { VacationCard } from "./Vacations/VacationCard";
import {
  activeVacationService,
  inactiveVacationService,
  followedVacationService,
} from "../services/vacationServices/filterVacationService";
import { Toaster } from "react-hot-toast";
import FilterBox from "./FilterBox";

const HomeBox = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingTop: "150px",
});

const CardsBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  boxSizing: "border-box",
  justifyContent: "center",
});

const StyledFilterBox = styled(Box)({
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
      if (user.token) {
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
      if (user.token) {
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
      <Toaster
        toastOptions={{ style: { zIndex: 2000 } }}
        position="top-center"
        reverseOrder={false}
      />
      <StyledFilterBox>
        <FilterBox
          allVacations={() => handleFilterVacations("all")}
          activeVacations={() => handleFilterVacations("active")}
          inactiveVacations={() => handleFilterVacations("inactive")}
          followedVacations={() => handleFilterVacations("followed")}
        />
      </StyledFilterBox>
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
