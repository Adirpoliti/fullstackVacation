import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { VacationType, VacationsType } from "../../types/VacationType";
import { getAllVacationsService } from "../../services/vacationServices/getVacations";
import { Box, styled } from "@mui/material";
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";

const ChartContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#191919",
  marginTop: "100px",
  paddingTop: "150px"
});

export default function ChartsOverviewDemo() {
  const user = useAppSelector(selectUser);
  const [vacations, setVacations] = useState<VacationsType[]>([]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const vacationsData = await getAllVacationsService(user.token);
        const betterVacations: VacationsType[] = vacationsData.map(
          (v: VacationType) => ({
            locationCountry: v.locationCountry,
            usersFollowed: v.usersFollowed,
          })
        );
        setVacations(betterVacations);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };

    fetchVacations();
  }, [user.token]);

  const seriesData = vacations.map((country) => country.locationCountry);

  const followers = vacations.map((country) => country.usersFollowed.length);

  return (
    <ChartContainer>
      <BarChart
        sx={{
          ".MuiChartsAxis-line": {
            stroke: "white !important",
          },
          ".MuiChartsAxis-tick": {
            stroke: "white !important",
          },
        }}
        xAxis={[
          {
            scaleType: "band",
            data: [...seriesData],
            colorMap: {
              type: "piecewise",
              thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
              colors: ["#29cedd"],
            },
            tickLabelStyle: {
              angle: 45,
              textAnchor: "start",
              fontSize: 15,
              fill: "white",
            },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: {
              fontSize: 15,
              fill: "white",
            },
          },
        ]}
        series={[{ data: [...followers] }]}
        width={1000}
        height={500}
      />
    </ChartContainer>
  );
}
