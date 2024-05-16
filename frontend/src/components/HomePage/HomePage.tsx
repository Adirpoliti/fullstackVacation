import React, { useEffect, useState } from "react";
import { Navbar } from "../NavBar/Navbar";
import { VacationCard } from "../VacationCard/VacationCard";
import { Box, styled } from "@mui/material";
import { vacationService } from "../../services/getVacations";
import { VacationType } from "../../types/VacationType";
import ChartsOverviewDemo from "../VacationChart/Chart";

const HomeBox = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
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

export const HomePage = () => {
  const [vacations, setVacations] = useState<VacationType[]>([]);

  useEffect(() => {
    const getAllVacations = async () => {
      try {
        const AllVacations = await vacationService();
        setVacations(AllVacations);
        console.log(AllVacations);
      } catch {
        console.log("error");
      }
    };

    getAllVacations();
  }, []);

  return (
    <HomeBox>
      <CardsBox>
        {vacations.map((v, i) => (
          <VacationCard
            key={i}
            _id={""}
            locationCountry={v.locationCountry}
            locationCity={v.locationCity}
            description={v.description}
            startDate={v.startDate}
            endDate={v.endDate}
            price={v.price}
            imageName={v.imageName}
            usersFollowed={[]}
          />
        ))}
      </CardsBox>
      <ChartsOverviewDemo />
    </HomeBox>
  );
};
